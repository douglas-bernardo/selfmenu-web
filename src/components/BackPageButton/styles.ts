import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;

  a.backPage {
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
