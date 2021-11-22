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

import Input from '../../components/Input';
import { api } from '../../services/api';
import Loading from '../../components/Loading';
import { BreadCrumb } from '../../components/BreadCrumb';
import { BreadCrumbItem } from '../../components/BreadCrumbItem';
import ToggleButton from '../../components/ToggleButton';
import { Select } from '../../components/Select';

import { Main, FormWrapper, Form } from './styles';
import { BackPageButton } from '../../components/BackPageButton';

interface IEstablishment {
  id: number;
  name: string;
}

interface IWaiter {
  id: number;
  name: string;
}

interface ITable {
  id: string;
  token: string;
  number: number;
  capacity: number;
  establishment_id: string;
  waiter_id: string;
  status_table_id: number;
  active: boolean;
}

interface LocationProps {
  table_id?: number;
}

export const TableForm: React.FC = () => {
  const location = useLocation<LocationProps>();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToast } = useToast();

  const [tableActive, setTableActive] = useState(false);

  const [table, setTable] = useState<ITable>();

  const [establishmentOptions, setEstablishmentOptions] = useState<
    OptionsType<OptionTypeBase>
  >([]);

  const [waitersOptions, setWaitersOptions] = useState<
    OptionsType<OptionTypeBase>
  >([]);

  useEffect(() => {
    Promise.all([
      api.get<IEstablishment[]>(`/establishments`, {
        params: {
          active: true,
        },
      }),
      api.get<IWaiter[]>(`/waiters`, {
        params: {
          active: true,
        },
      }),
    ])
      .then(response => {
        const [establishments, waiters] = response;

        const establishmentsOpts = establishments.data.map(
          (opt: IEstablishment) => {
            return { value: opt.id, label: opt.name };
          },
        );
        setEstablishmentOptions(establishmentsOpts);

        const waiterOpts = waiters.data.map((opt: IWaiter) => {
          return { value: opt.id, label: opt.name };
        });
        setWaitersOptions(waiterOpts);

        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (location.state?.table_id) {
      api.get<ITable>(`/tables/${location.state?.table_id}`).then(response => {
        setTable(response.data);

        setTableActive(response.data.active);
        setIsLoading(false);

        const selected = establishmentOptions.find(opt => {
          return opt.value === response.data.establishment_id;
        });
        formRef.current?.setFieldValue('establishment_id', {
          value: selected?.value,
          label: selected?.label,
        });
      });
    } else {
      setIsLoading(false);
    }
  }, [location.state?.table_id, establishmentOptions]);

  const handleSubmit = useCallback(
    async (data: IEstablishment) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          capacity: Yup.number().required('Capacidade da mesa é obrigatório'),
          waiter_id: Yup.string().required('Garçom responsável é obrigatório'),
          establishment_id: Yup.string().required(
            'Estabelecimento é obrigatório',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        if (location.state?.table_id) {
          const edited = {
            ...data,
            active: tableActive,
          };
          await api.put(`/tables/${location.state?.table_id}`, edited);
        } else {
          await api.post('/tables', data);
        }

        addToast({
          type: 'success',
          title: location.state?.table_id
            ? 'Dados atualizados com sucesso'
            : 'Mesa cadastrada com sucesso!',
        });

        history.push('/tables');
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
    [location.state?.table_id, addToast, history, tableActive],
  );

  const updateActivateTable = useCallback(() => {
    setTableActive(!tableActive);
  }, [tableActive]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <BreadCrumb>
            <BreadCrumbItem link="/tables" label="Mesas" />
            <BreadCrumbItem
              label={location.state?.table_id ? 'Editar' : 'Novo'}
            />
          </BreadCrumb>
        </Header>

        <Main>
          {isLoading ? (
            <Loading />
          ) : (
            <FormWrapper>
              <BackPageButton page="tables" />
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="label">Capacidade:</div>
                  <Input
                    name="capacity"
                    maxLength={1}
                    defaultValue={table?.capacity}
                    mask="number"
                  />
                </div>

                <div className="row">
                  <div className="label">Garçom:</div>
                  <Select
                    name="waiter_id"
                    options={waitersOptions}
                    menuPlacement="auto"
                    placeholder="Selecione o garçom responsável..."
                  />
                </div>

                <div className="row">
                  <div className="label">Estabelecimento:</div>
                  <Select
                    name="establishment_id"
                    options={establishmentOptions}
                    menuPlacement="auto"
                    placeholder="Selecione o estabelecimento..."
                  />
                </div>

                {location.state?.table_id && (
                  <div className="row">
                    <div className="label">Ativo:</div>
                    <ToggleButton
                      selected={table?.active}
                      onChange={updateActivateTable}
                    />
                  </div>
                )}

                <button type="submit" data-testid="add-establishment-button">
                  <p className="text">Salvar</p>
                </button>
              </Form>
            </FormWrapper>
          )}
        </Main>
      </Content>
    </Container>
  );
};
