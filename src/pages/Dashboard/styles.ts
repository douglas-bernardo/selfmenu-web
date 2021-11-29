import styled from 'styled-components';

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;
  color: #3c3c3c;
  margin-top: 100px;

  div.horizontalRowChart {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin-bottom: 30px;
`;

export const DataCard = styled.div`
  display: flex;
  height: 130px;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #e6e8eb;
  box-shadow: 0 0 0.875rem 0 rgb(41 48 66 / 5%);

  img.data-card-logo {
    width: 55px;
    height: 55px;
  }

  div.data-card-content {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const BestSellersContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;

  padding: 30px;
  border-radius: 10px;
`;

export const BestSellersTable = styled.table`
  width: 100%;
  margin-top: 33px;
  border-collapse: collapse;
  border-spacing: 0;

  img.productCover {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 10px;
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
    font-weight: bold;
  }

  td.product {
    width: 50px;
  }

  svg.gold {
    color: #feb906;
  }

  svg.grey {
    color: #a3a3a3;
  }
`;
