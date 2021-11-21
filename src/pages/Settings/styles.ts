import styled from 'styled-components';

export const Main = styled.div`
  height: 100%;
  overflow: auto;
  padding: 30px;
  color: #3c3c3c;
`;

export const SettingsContent = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  min-height: 720px;
`;

export const SettingsContentHeader = styled.header`
  display: flex;
  flex: 1;
  margin-bottom: 50px;
`;

export const SettingsListContainer = styled.div`
  display: grid;
  grid-gap: 1rem;

  /* padding: 50px;
  background: #fff;
  border-radius: 10px;

  min-height: 780px; */

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1600px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1680px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

// export const CardsContainer = styled.div``;

export const CardConfig = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  padding: 10px;
  width: 340px;
  height: 120px;

  border: 1px solid #ccc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  a {
    width: 340px;
    height: 120px;
    text-decoration: none;

    display: flex;
    justify-content: start;
    align-items: center;

    color: #3c3c3c;
  }

  img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }

  div.cardContent {
    display: flex;
    flex-direction: column;

    h3 {
      line-height: 30px;
      margin-bottom: 10px;
    }
  }
`;
