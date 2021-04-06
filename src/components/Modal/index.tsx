/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  width?: string;
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({
  width,
  children,
  isOpen,
  setIsOpen,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          padding: '0',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#FFF',
          color: '#000000',
          borderRadius: '8px',
          width: width || '736px',
          border: 'none',
          overflow: 'unset',
        },
        overlay: {
          backgroundColor: '#121214b3',
          zIndex: '2',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
