import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 30px;

  a {
    display: flex;
    align-items: center;

    color: #3c3c3c;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff365f')};
    }
  }
`;
