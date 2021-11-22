import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface TableContentProps {
  withdrawn: boolean;
}

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;
  color: #3c3c3c;
  margin-top: 100px;

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

export const TableContent = styled.div<TableContentProps>`
  padding: 50px;
  background: #fff;
  border-radius: 10px;
  min-height: 720px;

  transition: 0.3s;

  ${props =>
    props.withdrawn &&
    css`
      margin-right: 350px;
    `}
`;

export const TableContentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  a {
    display: flex;
    height: 50px;
    width: 50px;
    border-radius: 50%;

    align-items: center;
    justify-content: center;
    color: #fff;
    background: #02c697;
    border: 0;
    text-decoration: none;

    &:hover {
      background: ${shade(0.2, '#02c697')};
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const HeaderControls = styled.div`
  display: flex;
`;

export const CRCodeGenButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  height: 50px;
  border: 0;
  background: transparent;
  background: #fff;
  border-radius: 5px;

  padding: 0 15px;
  margin-right: 20px;

  transition-duration: 0.3s;

  &:hover {
    background: ${shade(0.2, '#F0F2F5')};
  }

  svg {
    margin-right: 20px;
  }
`;

export const TablesSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex: 1;

  justify-content: flex-start;
  align-items: center;

  h4 {
    width: 15%;
  }

  div.line {
    border: 1px solid #f2f5f8;
    width: 100%;
  }
`;

export const TablesSectionBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 10px 0;
`;
