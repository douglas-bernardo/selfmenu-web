import styled, { css } from 'styled-components';

export interface ButtonsProps {
  theme: {
    confirmYes?:
      | 'info'
      | 'success'
      | 'success_light'
      | 'danger'
      | 'danger_light';
    confirmNo?:
      | 'info'
      | 'success'
      | 'success_light'
      | 'danger'
      | 'danger_light';
  };
}

interface ContainerProps {
  buttonType?: ButtonsProps;
}

const buttonTypeVariations = {
  info: css`
    background: #f5f8fa;
    color: #3c3c3c;
  `,

  success: css`
    background: #02c697;
    color: #fff;
  `,

  success_light: css`
    background: rgba(18, 164, 84, 0.5);
    color: #fff;
  `,

  danger: css`
    background: #ff365f;
    color: #fff;
  `,

  danger_light: css`
    background: rgba(255, 10, 84, 0.5);
    color: #fff;
  `,
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 260px;
  padding: 30px;

  footer {
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      height: 40px;
      width: 150px;
      align-items: center;
      justify-content: center;
      color: #fff;
      border: 0;
      border-radius: 20px;
      text-decoration: none;
      font-weight: bold;

      transition: filter 0.2s;

      .text {
        padding: 16px 24px;
        font-weight: bold;
      }

      & + button {
        margin-left: 10px;
      }

      &:hover {
        filter: brightness(0.95);
      }
    }

    button.confirmYes {
      ${props =>
        buttonTypeVariations[props.buttonType?.theme.confirmYes || 'info']}
    }

    button.confirmNo {
      ${props =>
        buttonTypeVariations[props.buttonType?.theme.confirmNo || 'info']}
    }
  }
`;
