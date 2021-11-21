import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { FiCamera } from 'react-icons/fi';
import { TiArrowLeftThick } from 'react-icons/ti';

import { Container, Content } from '../../components/Container';
import { Main, WaiterCreateContainer, Form, ImageContainer } from './styles';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import Input from '../../components/Input';
import { api } from '../../services/api';

interface Waiter {
  id: number;
  name: string;
  login: string;
  phone_number: string;
}

const WaitersCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleSubmit = useCallback(
    async (data: Waiter) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do garçom é obrigatório'),
          login: Yup.string().required('Login é obrigatória'),
          phone_number: Yup.string().required('Telefone é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('login', data.login);
        formData.append('phone_number', data.phone_number);

        if (image) {
          formData.append(
            'url_photo',
            `http://localhost:3000/images/${image.name}`,
          );
          formData.append('image', image);
        }

        const object = Object.fromEntries(formData);
        const prepared = {
          ...object,
          active: true,
        };

        await api.post(`/waiters`, prepared);
        history.push('/settings/waiters');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [image, history],
  );

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      setImage(event.target.files[0]);

      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    },
    [],
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Garçom | Novo</h1>
        </Header>
        <Main>
          <WaiterCreateContainer>
            <div className="linkBackPage">
              <Link to="/settings/waiters">
                <TiArrowLeftThick size={25} />
                <span>Voltar</span>
              </Link>
            </div>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="row">
                <div className="label">Fotos:</div>
                <ImageContainer>
                  <label htmlFor="image" className="new-image">
                    {previewImage && <img src={previewImage} alt="ImageName" />}
                    <FiCamera />
                    <input
                      name="image"
                      type="file"
                      id="image"
                      onChange={handleSelectImages}
                    />
                  </label>
                </ImageContainer>
              </div>

              <div className="row">
                <div className="label">Nome:</div>
                <Input name="name" placeholder="Nome do Garçom" />
              </div>

              <div className="row">
                <div className="label">Login:</div>
                <Input name="login" placeholder="Login" />
              </div>

              <div className="row">
                <div className="label">Celular:</div>
                <Input
                  mask="phone"
                  name="phone_number"
                  placeholder="Telefone Celular"
                />
              </div>

              <button type="submit" data-test-id="add-waiter-button">
                <p className="text">Salvar</p>
              </button>
            </Form>
          </WaiterCreateContainer>
        </Main>
      </Content>
    </Container>
  );
};

export default WaitersCreate;
