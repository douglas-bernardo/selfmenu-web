import styled from 'styled-components';
import { shade } from 'polished';

import { Form as Unform } from '@unform/web';

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;
  color: #3c3c3c;
  margin-top: 100px;

  max-width: 1120px;
`;

export const FormWrapper = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  min-height: 500px;
`;

export const WaiterCreateContainer = styled.div`
  padding: 50px;
  background: #fff;
  border-radius: 10px;

  div.linkBackPage {
    padding: 20px 0;
    margin-bottom: 30px;

    a {
      display: flex;
      align-items: center;

      color: #3c3c3c;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.2s;

      svg {
        margin-right: 5px;
      }

      span {
        margin-top: 2px;
      }

      &:hover {
        color: ${shade(0.2, '#ff365f')};
      }
    }
  }
`;

export const Form = styled(Unform)`
  background: #fff;
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  div {
    margin-top: 0px;
  }

  div.control {
    display: flex;
  }

  div.control > div {
    /* width: 250px; */
    :not(:last-child) {
      margin-right: 20px;
    }
  }

  div.row {
    display: flex;
    margin-bottom: 30px;
  }

  div.row div {
    /* width: 250px; */
    /* :not(:last-child) {
      margin-right: 20px;
    } */
  }

  div.label {
    margin-right: 30px;
    min-width: 115px;
    padding-top: 10px;
    font-weight: bold;
  }

  button {
    align-self: flex-end;
  }

  button {
    display: flex;
    height: 40px;
    width: 178px;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #02c697;
    border: 0;
    border-radius: 20px;
    text-decoration: none;

    .text {
      padding: 16px 24px;
      font-weight: bold;
    }
  }

  .logoErrorInput {
    margin-left: 5px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
  }

  label.new-image {
    height: 90px;
    width: 90px;
    background: #f5f8fa;
    border: 1px solid #a3a3a3;
    border-radius: 50%;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 30px;
      height: 30px;
      color: #312e38;
    }
  }

  input[type='file'] {
    display: none;
  }
`;
