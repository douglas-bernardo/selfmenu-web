import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { OptionsType, OptionTypeBase } from 'react-select';

import { FiPlus } from 'react-icons/fi';

import { Container, Content } from '../../components/Container';
import { Main, FormWrapper, Form, ImageContainer } from './styles';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import { Select } from '../../components/Select';
import { api } from '../../services/api';
import ToggleButton from '../../components/ToggleButton';
import { numberFormat, currencyFormatAsNumber } from '../../utils/numberFormat';
import { BreadCrumb } from '../../components/BreadCrumb';
import { BreadCrumbItem } from '../../components/BreadCrumbItem';
import { useToast } from '../../hooks/toast';
import { BackPageButton } from '../../components/BackPageButton';

const selectCustomStyles = {
  container: base => ({
    ...base,
    flex: 1,
  }),
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  price_formatted: string;
  quantity: number;
  available: boolean;
  category_id: number;
  photo: string;
  photo_url: string;
}

interface Category {
  id: number;
  name: string;
}

interface LocationProps {
  product_id?: number;
}

export const ProductForm: React.FC = () => {
  const location = useLocation<LocationProps>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [product, setProduct] = useState<Product>({} as Product);
  const [productAvailability, setProductAvailability] = useState(false);

  const [image, setImage] = useState<File>({} as File);
  const [previewImage, setPreviewImage] = useState<string>('');

  const [categoryOptions, setCategoryOptions] = useState<
    OptionsType<OptionTypeBase>
  >([]);

  useEffect(() => {
    api
      .get<Category[]>('/categories')
      .then(response => {
        setCategoryOptions(
          response.data.map((opt: Category) => {
            return { value: opt.id, label: opt.name };
          }),
        );
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (location.state?.product_id) {
      api
        .get<Product>(`products/${location.state.product_id}`)
        .then(response => {
          setProduct({
            ...response.data,
            price_formatted: numberFormat(response.data.price),
          });

          setProductAvailability(response.data.available);
          setPreviewImage(response.data.photo_url);

          const selected = categoryOptions.find(opt => {
            return opt.value === Number(response.data.category_id);
          });
          formRef.current?.setFieldValue('category_id', {
            value: selected?.value,
            label: selected?.label,
          });
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }
  }, [location.state?.product_id, categoryOptions]);

  const updateAvailability = useCallback(() => {
    setProductAvailability(!productAvailability);
  }, [productAvailability]);

  const handleSubmit = useCallback(
    async (data: Omit<Product, 'id'>) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome do produto é obrigatório')
            .matches(
              /^[aA-zZ0-9\s]+$/,
              'Apenas alfabetos são permitidos para este campo',
            ),
          category_id: Yup.string().required('Categoria é obrigatória'),
          price_formatted: Yup.string().required('Preço é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category_id', String(data.category_id));
        formData.append(
          'price',
          String(currencyFormatAsNumber(data.price_formatted)),
        );
        formData.append('quantity', String(data.quantity));
        formData.append('photo', image);

        if (location.state?.product_id) {
          formData.append('available', String(productAvailability));

          await api.put(`/products/${location.state?.product_id}`, formData);
        } else {
          await api.post(`/products`, formData);
        }

        addToast({
          type: 'success',
          title: location.state?.product_id
            ? 'Dados atualizados com sucesso'
            : 'Produto cadastrado com sucesso!',
        });

        history.push('/products');
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
    [location.state?.product_id, image, productAvailability, history, addToast],
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

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <BreadCrumb>
            <BreadCrumbItem link="/products" label="Produtos" />
            <BreadCrumbItem
              label={location.state?.product_id ? 'Editar' : 'Novo'}
            />
          </BreadCrumb>
        </Header>
        <Main>
          <FormWrapper>
            <BackPageButton page="products" />
            {product && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="label">Foto:</div>
                  <ImageContainer>
                    <label htmlFor="image" className="new-image">
                      {previewImage?.length > 0 && (
                        <img src={previewImage} alt="ImageName" />
                      )}

                      <FiPlus size={24} color="#15b6d6" />
                      <input
                        name="images"
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
                    placeholder="Nome do Produto"
                    defaultValue={product.name}
                  />
                </div>

                <div className="row">
                  <div className="label">Descrição:</div>
                  <TextArea
                    name="description"
                    placeholder="Descrição"
                    defaultValue={product.description}
                  />
                </div>

                <div className="row">
                  <div className="label">Categoria:</div>
                  <Select
                    name="category_id"
                    options={categoryOptions}
                    styles={selectCustomStyles}
                    menuPlacement="auto"
                    placeholder="Selecione a categoria..."
                  />
                </div>

                <div className="row">
                  <div className="label">Preço:</div>
                  <Input
                    mask="currency"
                    name="price_formatted"
                    placeholder="Informe o preço unitário"
                    defaultValue={product.price_formatted}
                  />
                </div>

                <div className="row">
                  <div className="label">Quantidade:</div>
                  <Input
                    mask="number"
                    name="quantity"
                    placeholder="Quantidade (estoque)"
                    defaultValue={product.quantity}
                  />
                </div>

                {location.state?.product_id && (
                  <div className="row">
                    <div className="label">Disponível:</div>
                    <ToggleButton
                      selected={product.available}
                      onChange={updateAvailability}
                    />
                  </div>
                )}
                <button type="submit" data-test-id="add-product-button">
                  <p className="text">Salvar Alterações</p>
                </button>
              </Form>
            )}
          </FormWrapper>
        </Main>
      </Content>
    </Container>
  );
};
