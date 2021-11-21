import React, {
  useRef,
  useCallback,
  useState,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiPlus } from 'react-icons/fi';
import { Form, ImageContainer } from './styles';

import Modal from '../Modal';
import Input from '../Input';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface ICategory {
  id: number;
  name: string;
  image_cover: string;
  image_cover_url: string;
  active: boolean;
}

interface IModalProps {
  category?: ICategory;
  isOpen: boolean;
  setIsOpen: () => void;
  handleCategory: (
    category: Omit<ICategory, 'id'>,
    image: File,
  ) => Promise<void>;
}

export interface CategoryModalHandles {
  clearForm: () => void;
}

const AddNewCategoryModal: React.ForwardRefRenderFunction<
  CategoryModalHandles,
  IModalProps
> = ({ category, isOpen, setIsOpen, handleCategory }, refInput) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [image, setImage] = useState<File>({} as File);
  const [previewImage, setPreviewImage] = useState<string>('');

  const clearForm = useCallback(() => {
    setPreviewImage('');
  }, []);

  useImperativeHandle(refInput, () => {
    return {
      clearForm,
    };
  });

  const handleSubmit = useCallback(
    async (data: ICategory) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da categoria é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await handleCategory(data, image);
        setPreviewImage('');
        setIsOpen();

        addToast({
          type: 'success',
          title: 'Nova categoria registrada com sucesso!',
        });
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
    [handleCategory, setIsOpen, image, addToast],
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
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} width="712px">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>{category ? 'Editar Categoria' : 'Cadastrar Categoria'}</h1>
        <div className="row">
          <div className="label">Capa:</div>
          <ImageContainer>
            <label htmlFor="image" className="new-image">
              {previewImage?.length > 0 && (
                <img
                  src={category?.image_cover_url || previewImage}
                  alt="ImageName"
                />
              )}
              {console.log(previewImage)}

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

        <button type="submit" data-testid="add-category-button">
          <p className="text">Salvar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default forwardRef(AddNewCategoryModal);
