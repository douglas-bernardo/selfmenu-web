import styled from 'styled-components';
import { shade } from 'polished';

import searchIcon from '../../assets/search.svg';

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;
  color: #3c3c3c;
  margin-top: 100px;
`;

export const ProductContent = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  min-height: 500px;
`;

export const ProductContentHeader = styled.header`
  display: flex;
  justify-content: space-between;

  a {
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

    &:hover {
      background: ${shade(0.2, '#02c697')};
    }
  }

  input.search-bar {
    width: 220px;
    border: 0;
    height: 34px;
    padding-left: 35px;
    padding-right: 10px;
    font-size: 12px;
    border-radius: 5px;
    background: url(${searchIcon}) no-repeat 5px center, #f0f0f0;
    background-size: 20px;

    ::placeholder {
      color: #a3a3a3;
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;
  margin-top: 33px;
  border-collapse: collapse;
  border-spacing: 0;

  img.productImage {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }

  & + tr {
    margin-top: 20px;
  }

  th {
    text-align: left;
    height: 40px;
    line-height: 40px;
  }

  tbody tr:hover {
    background: #f5f5f5;
  }

  td {
    white-space: normal;
    text-align: left;
    height: 55px;
    padding: 5px;
    border-top: 1px solid #f0f0f0;
    font-size: 14px;
  }

  td.clientName {
    width: 270px;
  }

  svg.gold {
    color: #feb906;
  }

  svg.grey {
    color: #a3a3a3;
  }

  button.productActions {
    background: transparent;
    border: 0;
  }
`;
