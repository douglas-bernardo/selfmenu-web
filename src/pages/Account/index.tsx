import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { api } from '../../services/api';

import { useToast } from '../../hooks/toast';

import { getValidationErrors } from '../../utils/getValidationErrors';

import defaultAvatar from '../../assets/user.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput, PlanContainer } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  profile_name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export const Account: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { account, updateAccount } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          profile_name: Yup.string().required('Nome Perfil obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          profile_name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          profile_name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateAccount(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no atualização',
          description: 'Ocorreu um erro ao fazer atualização',
        });
      }
    },
    [addToast, history, updateAccount],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();

      if (e.target.files) {
        data.append('avatar', e.target.files[0]);

        api.patch('/account/avatar', data).then(response => {
          updateAccount(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateAccount],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            profile_name: account.profile_name,
            email: account.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img
              src={account.avatar_url || defaultAvatar}
              alt={account.profile_name}
            />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Dados da conta</h1>

          <Input name="profile_name" icon={FiUser} placeholder="Nome Perfil" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar Senha"
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>

        <PlanContainer>
          <h3>Seu Plano</h3>

          <section>
            <div className="planCard">
              <div className="planHeader">
                <span>{account.plan.name}</span>
              </div>
              <div className="cardBody">
                <p>{account.plan.description}</p>
              </div>
            </div>
          </section>

          {account.plan.id === 1 && (
            <Link to="/purchase/premium">Seja Premium</Link>
          )}
        </PlanContainer>
      </Content>
    </Container>
  );
};
