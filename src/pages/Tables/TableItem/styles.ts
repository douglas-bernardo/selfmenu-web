import styled, { css } from 'styled-components';

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

export const Container = styled.div<TableItemProps>`
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
