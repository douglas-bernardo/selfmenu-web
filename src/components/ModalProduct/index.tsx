import React, {
  useRef,
  useCallback,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { OptionsType, OptionTypeBase } from 'react-select';

import { FiPlus } from 'react-icons/fi';

import { Form, ImageContainer } from './styles';

import Modal from '../Modal';
import Input from '../Input';

import { getValidationErrors } from '../../utils/getValidationErrors';
import TextArea from '../TextArea';
import { api } from '../../services/api';
import { Select } from '../Select';

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
  category_id: number;
  price: string;
  url_photo: string;
  rate: number;
  available: boolean;
  images: File[];
}

interface Category {
  id: number;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleProduct: (category: Omit<Product, 'id'>, images: File[]) => void;
}

const ModalProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleProduct,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [categoryOptions, setCategoryOptions] = useState<
    OptionsType<OptionTypeBase>
  >([]);

  useEffect(() => {
    api
      .get<Category[]>(`/category`, {
        params: {
          status: true,
        },
      })
      .then(response => {
        const options = response.data.map((opt: Category) => {
          return { value: opt.id, label: opt.description };
        });
        if (!options) return;
        setCategoryOptions(options);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  const handleSubmit = useCallback(
    async (data: Product) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do produto é obrigatório'),
          category_id: Yup.string().required('Categoria é obrigatória'),
          price: Yup.string().required('Preço é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        handleProduct(data, images);
        setPreviewImages([]);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleProduct, setIsOpen, images],
  );

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} width="712px">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Produto</h1>
        <div className="row">
          <div className="label">Fotos:</div>
          <ImageContainer>
            {previewImages.map(image => {
              return <img key={image} src={image} alt="ImageName" />;
            })}

            <label htmlFor="image[]" className="new-image">
              <FiPlus size={24} color="#15b6d6" />
              <input
                name="images"
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </label>
          </ImageContainer>
        </div>

        <div className="row">
          <div className="label">Nome:</div>
          <Input name="name" placeholder="Nome do Produto" />
        </div>

        <div className="row">
          <div className="label">Descrição:</div>
          <TextArea name="description" placeholder="Descrição" />
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
            name="price"
            placeholder="Informe o preço unitário"
          />
        </div>

        <button type="submit" data-testid="add-product-button">
          <p className="text">Salvar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalProduct;
