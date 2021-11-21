import styled from 'styled-components';
import { shade } from 'polished';

import searchIcon from '../../assets/search.svg';

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;
  color: #3c3c3c;
`;

export const CategoryContent = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  min-height: 720px;
`;

export const CategoryContentHeader = styled.header`
  display: flex;
  justify-content: space-between;

  margin-bottom: 50px;

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

export const ListCategoryContainer = styled.div`
  display: grid;
  grid-gap: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1600px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1680px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const CategoryContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;

  padding: 10px;
  max-width: 300px;
  height: 90px;

  background: transparent;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.04);
  }

  a {
    width: 340px;
    height: 150px;
    text-decoration: none;

    display: flex;
    justify-content: start;
    align-items: center;

    color: #3c3c3c;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
  }

  div.cardContent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
      margin-bottom: 8px;
    }
  }
`;
