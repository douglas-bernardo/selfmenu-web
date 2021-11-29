import React, {
  useRef,
  useCallback,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiPlus } from 'react-icons/fi';

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

import { Main, Form, FormWrapper, ImageContainer } from './styles';
import { BackPageButton } from '../../components/BackPageButton';

interface ICategory {
  id: number;
  name: string;
  image_cover: string;
  image_cover_url: string;
  active: boolean;
}

interface LocationProps {
  category_id?: number;
}

export const CategoryForm: React.FC = () => {
  const location = useLocation<LocationProps>();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToast } = useToast();
  const [image, setImage] = useState<File>({} as File);
  const [previewImage, setPreviewImage] = useState<string>('');

  const [categoryAvailability, setCategoryAvailability] = useState(false);
  const [category, setCategory] = useState<ICategory>();

  useEffect(() => {
    if (location.state?.category_id) {
      api
        .get<ICategory>(`/categories/${location.state?.category_id}`)
        .then(response => {
          setCategory(response.data);
          setCategoryAvailability(response.data.active);
          setPreviewImage(response.data.image_cover_url);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [location.state?.category_id]);

  const handleSubmit = useCallback(
    async (data: ICategory) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome da categoria é obrigatório')
            .matches(
              /^[aA-zZ\s]+$/,
              'Apenas alfabetos são permitidos para este campo',
            ),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image_cover', image);

        if (location.state?.category_id) {
          formData.append('active', String(categoryAvailability));
          await api.put(`/categories/${location.state?.category_id}`, formData);
        } else {
          await api.post('/categories', formData);
        }

        addToast({
          type: 'success',
          title: location.state?.category_id
            ? 'Dados da categoria atualizados'
            : 'Nova categoria registrada com sucesso!',
        });

        history.push('/categories');
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
      location.state?.category_id,
      image,
      addToast,
      history,
      categoryAvailability,
    ],
  );

  const handleSelectImages = useCallback(
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

  const updateAvailability = useCallback(() => {
    setCategoryAvailability(!categoryAvailability);
  }, [categoryAvailability]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <BreadCrumb>
            <BreadCrumbItem link="/categories" label="Categorias" />
            <BreadCrumbItem
              label={location.state?.category_id ? 'Editar' : 'Novo'}
            />
          </BreadCrumb>
        </Header>

        <Main>
          {isLoading ? (
            <Loading />
          ) : (
            <FormWrapper>
              <BackPageButton page="categories" />
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="label">Capa:</div>
                  <ImageContainer>
                    <label htmlFor="image" className="new-image">
                      {previewImage?.length > 0 && (
                        <img src={previewImage} alt="ImageName" />
                      )}

                      <FiPlus size={24} color="#15b6d6" />
                      <input
                        name="image"
                        onChange={handleSelectImages}
                        type="file"
                        id="image"
                      />
                    </label>
                  </ImageContainer>
                </div>

                <div className="row">
                  <div className="label">Nome:</div>
                  <Input
                    name="name"
                    placeholder="Nome da Categoria"
                    defaultValue={category?.name}
                  />
                </div>

                {location.state?.category_id && (
                  <div className="row">
                    <div className="label">Ativo:</div>
                    <ToggleButton
                      selected={category?.active}
                      onChange={updateAvailability}
                    />
                  </div>
                )}

                <button type="submit" data-testid="add-category-button">
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
