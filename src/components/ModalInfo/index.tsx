import React, { useCallback } from 'react';
import Modal from '../Modal';

import { Container } from './styles';

interface ConfirmModalProps {
  title?: string;
  message?: string;
  confirmOk?: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

export const ModalInfo: React.FC<ConfirmModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  message,
  confirmOk,
}) => {
  const handleConfirmOk = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} width="500px">
      <Container>
        <header>
          <h3>{title || 'Action'}</h3>
        </header>
        <main>
          <p>{message || 'Confirm action?'}</p>
        </main>
        <footer>
          <button className="confirmOk" type="button" onClick={handleConfirmOk}>
            {confirmOk || 'Ok'}
          </button>
        </footer>
      </Container>
    </Modal>
  );
};
