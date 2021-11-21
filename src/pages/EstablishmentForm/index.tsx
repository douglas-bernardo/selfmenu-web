import React, { useRef, useCallback, useState, useEffect } from 'react';

import { OptionsType, OptionTypeBase } from 'react-select';
import { useLocation, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { BreadCrumb } from '../../components/BreadCrumb';
import { BreadCrumbItem } from '../../components/BreadCrumbItem';
import { Select } from '../../components/Select';

import Input from '../../components/Input';
import Loading from '../../components/Loading';
import ToggleButton from '../../components/ToggleButton';

import { Main, Form } from './styles';
import { toCNPJ } from '../../utils/numberFormat';
import { BackPageButton } from '../../components/BackPageButton';

interface IEstablishment {
  id: string;
  name: string;
  cnpj: number;
  cnpjFormatted: string;
  description?: string;
  establishment_type_id: number;
  active: boolean;
}

interface IEstablishmentType {
  id: number;
  name: string;
}

interface LocationProps {
  establishment_id?: number;
}

export const EstablishmentForm: React.FC = () => {
  const location = useLocation<LocationProps>();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToast } = useToast();

  const [establishmentAvailability, setEstablishmentAvailability] = useState(
    false,
  );
  const [establishment, setEstablishment] = useState<IEstablishment>();

  const [typeEstablishmentOptions, setTypeEstablishmentOptions] = useState<
    OptionsType<OptionTypeBase>
  >([]);

  useEffect(() => {
    api
      .get<IEstablishmentType[]>(`/establishments/types`, {
        params: {
          status: true,
        },
      })
      .then(response => {
        const options = response.data.map((opt: IEstablishmentType) => {
          return { value: opt.id, label: opt.name };
        });
        if (!options) return;
        setTypeEstablishmentOptions(options);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (location.state?.establishment_id) {
      api
        .get<IEstablishment>(
          `/establishments/${location.state?.establishment_id}`,
        )
        .then(response => {
          setEstablishment({
            ...response.data,
            cnpjFormatted: toCNPJ(response.data.cnpj.toString()),
          });
          setEstablishmentAvailability(response.data.active);
          setIsLoading(false);

          const selected = typeEstablishmentOptions.find(opt => {
            return opt.value === Number(response.data.establishment_type_id);
          });
          formRef.current?.setFieldValue('establishment_type_id', {
            value: selected?.value,
            label: selected?.label,
          });
        });
    } else {
      setIsLoading(false);
    }
  }, [location.state?.establishment_id, typeEstablishmentOptions]);

  const handleSubmit = useCallback(
    async (data: IEstablishment) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do estabelecimento é obrigatório'),
          cnpj: Yup.string().required('CNPJ é obrigatório'),
          establishment_type_id: Yup.string().required(
            'Tipo de estabelecimento é obrigatório',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const dataFormatted = {
          ...data,
          cnpj: Number(String(data.cnpj).replace(/[^0-9]/g, '')),
        };

        if (location.state?.establishment_id) {
          const edited = {
            ...dataFormatted,
            active: establishmentAvailability,
          };
          await api.put(
            `/establishments/${location.state?.establishment_id}`,
            edited,
          );
        } else {
          await api.post('/establishments', dataFormatted);
        }

        addToast({
          type: 'success',
          title: location.state?.establishment_id
            ? 'Dados atualizados com sucesso'
            : 'Novo estabelecimento cadastrado com sucesso!',
        });

        history.push('/settings/establishments');
      } catch (err: any | Yup.ValidationError) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Não Permitido',
          description: err.response.data.message
            ? err.response.data.message
            : 'Erro na solicitação',
        });
      }
    },
    [
      location.state?.establishment_id,
      addToast,
      history,
      establishmentAvailability,
    ],
  );

  const updateAvailability = useCallback(() => {
    setEstablishmentAvailability(!establishmentAvailability);
  }, [establishmentAvailability]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <BreadCrumb>
            <BreadCrumbItem link="/settings" label="Configurações" />
            <BreadCrumbItem
              link="/settings/establishments"
              label="Estabelecimentos"
            />
            <BreadCrumbItem
              label={location.state?.establishment_id ? 'Editar' : 'Novo'}
            />
          </BreadCrumb>
        </Header>

        <Main>
          {isLoading ? (
            <Loading />
          ) : (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <BackPageButton page="settings/establishments" />
              <div className="row">
                <div className="label">Nome:</div>
                <Input name="name" defaultValue={establishment?.name} />
              </div>

              <div className="row">
                <div className="label">CNPJ:</div>
                <Input
                  name="cnpj"
                  mask="cnpj"
                  defaultValue={establishment?.cnpjFormatted}
                />
              </div>

              <div className="row">
                <div className="label">Descrição:</div>
                <Input
                  name="description"
                  defaultValue={establishment?.description}
                />
              </div>

              <div className="row">
                <div className="label">Tipo:</div>
                <Select
                  name="establishment_type_id"
                  options={typeEstablishmentOptions}
                  menuPlacement="auto"
                  placeholder="Selecione o tipo de estabelecimento..."
                />
              </div>

              {location.state?.establishment_id && (
                <div className="row">
                  <div className="label">Ativo:</div>
                  <ToggleButton
                    selected={establishment?.active}
                    onChange={updateAvailability}
                  />
                </div>
              )}

              <button type="submit" data-testid="add-establishment-button">
                <p className="text">Salvar</p>
              </button>
            </Form>
          )}
        </Main>
      </Content>
    </Container>
  );
};
