import React, { useCallback, useRef, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { BiDotsVertical } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import { OutSideClick } from '../../hooks/outSideClick';

import { Container, DropActionContent } from './styles';
import ModalConfirm from '../ModalConfirm';

interface DropActionProps {
  [key: string]: any;
}

const DropAction: React.FC<DropActionProps> = ({
  product_id,
  product_name,
  handleDeleteItem,
}) => {
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const btnActionDropRef = useRef<HTMLButtonElement>(null);
  const [positionContent, setPositionContent] = useState(0);
  const { visible, setVisible, ref } = OutSideClick(false);

  const handleClickButton = useCallback(() => {
    if (btnActionDropRef.current) {
      setPositionContent(btnActionDropRef.current.getBoundingClientRect().top);
    }
    setVisible(prevState => !prevState);
  }, [setVisible]);

  const toggleModalConfirm = useCallback(() => {
    setShowModalConfirmDelete(!showModalConfirmDelete);
  }, [showModalConfirmDelete]);

  const handleModalConfirm = useCallback(() => {
    toggleModalConfirm();
    handleDeleteItem(product_id);
  }, [toggleModalConfirm, handleDeleteItem, product_id]);

  return (
    <Container ref={ref}>
      <ModalConfirm
        title="Exclusão de Produto"
        message={`${product_name} será excluído. Confirma a exclusão o produto?`}
        confirmYes="Confirmar"
        confirmNo="Cancelar"
        isOpen={showModalConfirmDelete}
        setIsOpen={toggleModalConfirm}
        handleConfirmYes={handleModalConfirm}
      />
      <button
        ref={btnActionDropRef}
        className="openDropAction"
        type="button"
        onClick={handleClickButton}
      >
        <BiDotsVertical size={30} />
      </button>
      {visible && (
        <DropActionContent position={positionContent}>
          <>
            <span className="dropTitle">Ações:</span>
            <Link className="btnDropAction" to={`/menu/product/${product_id}`}>
              <FaEdit className="drop" />
              Editar
            </Link>
            <button
              className="btnDropAction"
              type="button"
              onClick={toggleModalConfirm}
            >
              <FaTrashAlt className="drop delete" />
              Excluir
            </button>
          </>
        </DropActionContent>
      )}
    </Container>
  );
};

export default DropAction;
