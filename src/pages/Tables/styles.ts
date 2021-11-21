import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface TableContentProps {
  withdrawn: boolean;
}

interface TableItemProps {
  status: number;
}

const statusVariations = {
  1: css`
    background: #c6efce;
  `,
  2: css`
    background: #ffc7ce;
  `,
  3: css`
    background: #ffeb9c;
  `,
};

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;

  color: #3c3c3c;
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

export const TablesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 10px 0;
`;

export const TableItem = styled.div<TableItemProps>`
  margin-right: 30px;
  margin-bottom: 30px;

  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  button {
    text-decoration: none;
    color: #666360;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;

    width: 200px;
    height: 160px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 10px;

    /* ${props =>
      props.status === 1 &&
      css`
        pointer-events: none;
      `} */
  }

  header {
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: #fbb1bd;
      margin-right: 15px;
      font-weight: bold;
      color: #000000;

      ${props => statusVariations[props.status || 1]}
    }
  }

  main {
    display: flex;
    align-items: center;

    svg {
      margin-left: 5px;
      margin-right: 15px;
    }

    span {
      font-size: 14px;
    }
  }

  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0 0 10px;

    border-top: 1px solid #c4c4c4;
    margin-left: 0px;
    margin-right: 0px;

    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 50%;

      margin-right: 15px;
      margin-left: 5px;
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;
