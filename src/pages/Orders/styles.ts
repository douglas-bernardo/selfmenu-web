import styled, { css } from 'styled-components';

interface ButtonProps {
  isSelected: boolean;
}

export const Main = styled.div`
  display: flex;
  width: 100%;
  margin-top: 100px;
  height: 100%;

  flex-direction: column;
  padding: 30px;
  background: #fff;
  color: #3c3c3c;
`;

export const OrdersMainContent = styled.div`
  height: 100%;
`;

export const MainHeaderControls = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const OrdersContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  flex-direction: row;
  background: #fff;

  div.divider {
    border-left: 2px solid #f2f5f8;
    height: 100%;
  }
`;

export const BackOrders = styled.section`
  flex: 1;
`;

export const InProcessOrders = styled.section`
  flex: 1;
`;

export const DoneOrders = styled.section`
  flex: 1;
`;

export const BackOrdersHeader = styled.header`
  flex: 1;
  padding: 15px;
`;

export const InProcessOrdersHeader = styled.header`
  flex: 1;
  padding: 15px;
`;

export const DoneOrdersHeader = styled.header`
  flex: 1;
  padding: 15px;
`;

export const OrdersContainer = styled.div`
  height: 90%;
  padding: 15px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #f2f5f8;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #a3a3a3;
  }
`;

export const ToggleScreenOrdersContainer = styled.div`
  display: flex;
`;

export const InProgressButton = styled.button<ButtonProps>`
  display: flex;
  flex-direction: column;

  height: 50px;
  padding: 5px 10px;
  border: 2px solid #ff477e;
  border-radius: 5px 0 0 5px;
  color: #ff477e;
  background: #fff;

  transition: 0.2s;

  ${props =>
    props.isSelected &&
    css`
      padding: 5px 10px;
      border: 2px solid #ff477e;
      color: #fff;
      background: #ff477e;
    `}

  justify-content: center;
  align-items: center;

  font-size: 13px;

  svg {
    margin-bottom: 3px;
  }
`;

export const DoneButton = styled.button<ButtonProps>`
  display: flex;
  flex-direction: column;

  height: 50px;
  padding: 5px 10px;
  border: 2px solid #ff477e;
  border-radius: 0 5px 5px 0;
  color: #ff477e;
  background: #fff;

  transition: 0.2s;

  ${props =>
    props.isSelected &&
    css`
      padding: 5px 10px;
      border: 2px solid #ff477e;
      color: #fff;
      background: #ff477e;
    `}

  justify-content: center;
  align-items: center;

  font-size: 13px;

  svg {
    margin-bottom: 3px;
  }
`;
