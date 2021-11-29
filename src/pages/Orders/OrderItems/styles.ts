import styled from 'styled-components';

export const Container = styled.div``;

export const Order = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;

  margin-bottom: 20px;

  border: 1px solid #f2f5f8;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);
`;

export const OrderHeader = styled.header`
  display: flex;
  flex: 1;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
`;

export const ActionOrderButton = styled.button`
  align-items: center;
  justify-content: center;
  color: #ff9000;
  background: transparent;
  border: 0;
  text-decoration: none;
`;

export const OrderItemsContainer = styled.div``;

export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;

  & + div {
    border-top: 1px solid #f2f5f8;
  }

  img {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 5px;

    margin-right: 10px;
  }

  h5 {
    font-weight: bold;
  }
`;

export const ItemInfo = styled.div``;
