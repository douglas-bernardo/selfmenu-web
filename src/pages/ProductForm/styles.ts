import styled from 'styled-components';

import { Form as Unform } from '@unform/web';

export const Main = styled.div`
  height: 100%;
  /* overflow: auto; */
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
    width: 250px;
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
    min-width: 75px;
    font-weight: bold;
    padding-top: 10px;
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
  position: relative;
  display: flex;
  align-items: center;

  /* flex-wrap: wrap;
  justify-content: start; */

  label.new-image {
    height: 95px;
    width: 95px;
    border-radius: 20px;

    right: 0;
    bottom: 0;
    border: 0;

    background: #f5f8fa;
    border: 1px dashed #96d2f0;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 95px;
      height: 95px;
      object-fit: cover;
      border-radius: 20px;
      /* margin-right: 10px;
    margin-bottom: 10px; */
    }
  }

  input[type='file'] {
    display: none;
  }
`;
