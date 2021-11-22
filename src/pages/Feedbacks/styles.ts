import styled from 'styled-components';

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;
  color: #3c3c3c;
  margin-top: 100px;
`;

export const FeedbackContent = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  min-height: 500px;

  header {
    display: flex;

    svg {
      margin-right: 10px;
      color: #feb906;
    }
  }
`;

export const FeedBackContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 5px 5px 5px;

  div.evaluationIdentity {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
  }

  div.evaluationRate {
    display: flex;
    align-items: center;
    line-height: 50px;

    span {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    p {
      color: #3c3c3c;
      font-weight: bold;
    }
  }

  div.evaluationDescription p {
    line-height: 26px;
  }
`;
