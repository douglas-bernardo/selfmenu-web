import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface TableDetails {
  is_show: boolean;
}

export const Container = styled.div<TableDetails>`
  position: fixed;
  height: 100vh;
  width: 0;

  transition: 0.3s;

  ${props =>
    props.is_show &&
    css`
      width: 350px;
    `}

  right: 0;
  top: 102px;
  overflow: hidden;

  background: #fff;
`;

export const TableDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #e8ebf2;
`;

export const TableDetailsHeader = styled.div`
  display: flex;
  width: 100%;
  height: 70px;

  align-items: center;
  justify-content: space-between;
  color: #3c3c3c;

  padding: 10px;

  background: #fff;
  margin-bottom: 3px;

  span {
    font-size: 18px;
    font-weight: bold;
  }

  button {
    height: 50px;
    width: 50px;
    background: transparent;
    border: 0;
  }
`;

export const TableDetailsMain = styled.div`
  padding: 10px;
  background: #fff;

  h3 {
    margin: 10px 0 15px 0;
  }
`;

export const TableDetailsFooter = styled.div`
  position: absolute;
  width: 100%;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TotalTable = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 10px;

  span {
    font-size: 28px;
  }
`;
export const PaymentButton = styled.button`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  background: #02c697;
  border: 0;

  font-weight: bold;

  svg {
    margin-right: 15px;
  }

  &:hover {
    background: ${shade(0.2, '#02c697')};
  }
`;

export const OrderContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: column;
  padding: 15px;

  border: 1px solid #c4c4c4;
  border-radius: 5px;

  margin-bottom: 5px;
`;

export const CustomerName = styled.div`
  flex: 1;
`;

export const OrderResume = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;
