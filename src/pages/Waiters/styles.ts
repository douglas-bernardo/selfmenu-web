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

export const WaitersContent = styled.div`
  padding: 50px;
  background: #fff;
  border-radius: 10px;

  header {
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

      transition-duration: 0.3s;

      &:hover {
        background: ${shade(0.2, '#02c697')};
        transform: scale(1.05);
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
  }

  table {
    width: 100%;
    margin-top: 33px;
    border-collapse: collapse;
    border-spacing: 0;

    img.waiterImage {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
    }

    & + tr {
      margin-top: 20px;
    }

    th {
      text-align: left;
      height: 40px;
      line-height: 40px;
    }

    th.centered {
      text-align: center;
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

      a {
        text-decoration: none;
        color: #3c3c3c;
      }
    }

    td.centered {
      text-align: center;
    }
  }
`;
