import React, { ButtonHTMLAttributes } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  text_loading?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  text_loading,
  ...rest
}) => (
  <Container type="button" {...rest}>
    {loading ? (
      <>
        <Loader type="Oval" color="#FFF" height={24} width={24} />
        <p>{text_loading || 'Carregando...'}</p>
      </>
    ) : (
      children
    )}
  </Container>
);

export default Button;
