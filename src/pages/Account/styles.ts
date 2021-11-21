import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;
    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;
  width: 100%;
  form {
    margin: 80px 0px 40px 0px;
    width: 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
    input[name='old_password'] {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const PlanContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 72px;

  h3 {
    font-size: 24px;
    line-height: 32px;
  }

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

  div.planCard {
    margin: 40px 0;
    width: 400px;
    border-radius: 4px;
    border: 1px solid #d9dadc;
    overflow: hidden;
  }

  div.planHeader {
    height: 230px;
    display: flex;
    height: 144px;
    -webkit-box-align: center;
    align-items: center;
    border: none;
    background: linear-gradient(
      -180deg,
      rgb(255, 153, 172) 0%,
      rgb(255, 112, 150) 100%
    );

    span {
      padding: 24px;
      font-size: 38px;
      letter-spacing: -1px;
      line-height: 56px;
      font-weight: 900;
      color: rgb(255, 255, 255);
    }
  }

  div.cardBody {
    padding: 24px;
  }
`;
