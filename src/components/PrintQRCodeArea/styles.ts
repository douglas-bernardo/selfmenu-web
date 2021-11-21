import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 90vh;
  overflow: hidden;
  padding: 30px;

  background: #fff;
`;

export const Content = styled.div`
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Header = styled.header`
  display: flex;
  padding: 10px;

  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  border-bottom: 1px solid #ccc;

  span {
    font-weight: bold;
  }
`;

export const HeaderControls = styled.div`
  display: flex;
`;

export const CancelPrintButton = styled.button`
  display: flex;
  height: 40px;
  width: 100px;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  color: #3c3c3c;
  border: 0;
  text-decoration: none;
  margin-right: 20px;

  transition-duration: 0.3s;

  &:hover {
    background: ${shade(0.2, '#F0F2F5')};
  }
`;

export const PrintButton = styled.button`
  display: flex;
  height: 40px;
  width: 160px;
  border-radius: 5px;
  padding: 15px;

  align-items: center;
  justify-content: space-between;
  color: #fff;
  background: #ff872c;
  border: 0;
  text-decoration: none;

  transition-duration: 0.3s;

  &:hover {
    background: ${shade(0.2, '#FF872C')};
  }
`;
