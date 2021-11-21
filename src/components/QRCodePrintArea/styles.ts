import styled from 'styled-components';

export const Container = styled.div``;

export const PrintArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px;
`;

export const TagItemCodePrint = styled.div`
  display: flex;
  width: 250px;
  height: 250px;
  border: 1px solid #000;

  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const TagHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
`;

export const TagBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TagFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px;
`;
