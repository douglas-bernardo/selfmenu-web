import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  width: 100%;

  border: 3px solid #e8ebf2;
  color: #666360;

  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border: 3px solid #003379;
      color: #003379;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #003379;
    `}

  textarea {
    flex: 1;
    padding: 5px;
    line-height: 1.5;
    background: transparent;
    border: 0;
    color: #000000;

    &::placeholder {
      color: #b7b7cc;
    }
  }
`;
