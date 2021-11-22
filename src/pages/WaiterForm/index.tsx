import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { OptionsType, OptionTypeBase } from 'react-select';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { FiCamera } from 'react-icons/fi';
import { FiUser, FiLock } from 'react-icons/fi';

import { Container, Content } from '../../components/Container';
import { Main, FormWrapper, Form, ImageContainer } from './styles';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import Input from '../../components/Input';
import { api } from '../../services/api';
import ToggleButton from '../../components/ToggleButton';
import { BreadCrumb } from '../../components/BreadCrumb';
import { BreadCrumbItem } from '../../components/BreadCrumbItem';
import Loading from '../../components/Loading';
import { Select } from '../../components/Select';
import { toCPF } from '../../utils/numberFormat';
import { BackPageButton } from '../../components/BackPageButton';

interface IEstablishment {
  id: string;
  name: string;
}

interface IWaiter {
  id: string;
  cpf: number;
  cpf_formatted: string;
  name: string;
  username: string;
  password: string;
  active: boolean;
  avatar: string;
  avatar_url: string;
  establishment_id: string;
  establishment: IEstablishment;
}

interface LocationProps {
  waiter_id?: number;
}

export const WaiterForm: React.FC = () => {
  const location = useLocation<LocationProps>();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const [establishmentOptions, setEstablishmentOptions] = useState<
    OptionsType<OptionTypeBase>
  >([]);

  const [waiter, setWaiter] = useState<IWaiter>();
  const [waiterIsActive, setWaiterIsActive] = useState(false);

  const [image, setImage] = useState<File>({} as File);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    api
      .get<IEstablishment[]>(`/establishments`, {
        params: {
          status: true,
        },
      })
      .then(response => {
        const options = response.data.map((opt: IEstablishment) => {
          return { value: opt.id, label: opt.name };
        });
        if (!options) return;
        setEstablishmentOptions(options);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (location.state?.waiter_id) {
      api
        .get<IWaiter>(`/waiters/${location.state?.waiter_id}`)
        .then(response => {
          const waiterData = response.data;
          setWaiter({
            ...waiterData,
            cpf_formatted: toCPF(waiterData.cpf.toString()),
          });
          setWaiterIsActive(waiterData.active);
          setPreviewImage(waiterData.avatar_url);

          const selected = establishmentOptions.find(opt => {
            return opt.value === waiterData.establishment_id;
          });
          formRef.current?.setFieldValue('establishment_id', {
            value: selected?.value,
            label: selected?.label,
          });
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }
    setIsLoading(false);
  }, [location.state?.waiter_id, establishmentOptions]);

  const handleActivateWaiter = useCallback(() => {
    setWaiterIsActive(!waiterIsActive);
  }, [waiterIsActive]);

  const handleSubmit = useCallback(
    async (data: IWaiter) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do garçom é obrigatório'),
          cpf: Yup.string().required('CPF é obrigatório'),
          username: Yup.string().required('Login é obrigatória'),
          establishment_id: Yup.string().required(
            'Estabelecimento é obrigatório',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        if (!location.state?.waiter_id) {
          if (data.password.length < 0) {
            formRef.current?.setErrors({
              password: 'Senha é obrigatṕoria',
            });
            return;
          }
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('establishment_id', data.establishment_id);
        formData.append('avatar', image);
        formData.append('cpf', String(data.cpf).replace(/[^0-9]/g, ''));

        if (location.state?.waiter_id) {
          formData.append('active', String(waiterIsActive));
          await api.put(`/waiters/${location.state?.waiter_id}`, formData);
        } else {
          await api.post('/waiters', formData);
        }

        history.push('/settings/waiters');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [image, history, waiterIsActive, location.state?.waiter_id],
  );

  const handleSelectImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const selectedImage = event.target.files[0];
      setImage(selectedImage);

      const preview = URL.createObjectURL(selectedImage);
      setPreviewImage(preview);
    },
    [],
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <BreadCrumb>
            <BreadCrumbItem link="/settings" label="Configurações" />
            <BreadCrumbItem link="/settings/waiters" label="Garçons" />
            <BreadCrumbItem
              label={location.state?.waiter_id ? 'Editar' : 'Novo'}
            />
          </BreadCrumb>
        </Header>
        <Main>
          {isLoading ? (
            <Loading />
          ) : (
            <FormWrapper>
              <BackPageButton page="settings/waiters" />
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="label">Foto:</div>
                  <ImageContainer title="Clique para alterar">
                    <label htmlFor="image" className="new-image">
                      {previewImage ? (
                        <img src={previewImage} alt="ImageName" />
                      ) : (
                        <FiCamera />
                      )}
                      <input
                        name="image"
                        type="file"
                        id="image"
                        onChange={handleSelectImage}
                      />
                    </label>
                  </ImageContainer>
                </div>
                <div className="row">
                  <div className="label">Nome:</div>
                  <Input
                    name="name"
                    placeholder="Nome do Garçom"
                    defaultValue={waiter?.name}
                  />
                </div>

                <div className="row">
                  <div className="label">CPF:</div>
                  <Input
                    name="cpf"
                    mask="cpf"
                    placeholder="CPF"
                    defaultValue={waiter?.cpf_formatted}
                  />
                </div>

                <div className="row">
                  <div className="label">Usuário:</div>
                  <Input
                    name="username"
                    icon={FiUser}
                    placeholder="Login"
                    defaultValue={waiter?.username}
                  />
                </div>

                <div className="row">
                  <div className="label">Senha:</div>
                  <Input
                    name="password"
                    icon={FiLock}
                    type="password"
                    placeholder="Senha"
                  />
                </div>

                <div className="row">
                  <div className="label">Estabelecimento:</div>
                  <Select
                    name="establishment_id"
                    options={establishmentOptions}
                    menuPlacement="auto"
                    placeholder="Selecione o tipo de estabelecimento de atuação"
                  />
                </div>

                {location.state?.waiter_id && (
                  <div className="row">
                    <div className="label">Ativo:</div>
                    <ToggleButton
                      selected={waiter?.active}
                      onChange={handleActivateWaiter}
                    />
                  </div>
                )}

                <button type="submit" data-test-id="add-waiter-button">
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
