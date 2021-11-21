import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { AiFillPrinter } from 'react-icons/ai';
import QRCodePrintArea from '../QRCodePrintArea';

import {
  Container,
  Content,
  Header,
  HeaderControls,
  CancelPrintButton,
  PrintButton,
} from './styles';

interface ITable {
  id: string;
  number: number;
  url_authenticate: string;
}

interface Props {
  tables: ITable[];
  setIsOpen: () => void;
}

const PrintQRCodeArea: React.FC<Props> = ({ tables, setIsOpen }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Container>
      <Content>
        <Header>
          <span>Prévia</span>
          <HeaderControls>
            <CancelPrintButton onClick={setIsOpen}>Cancelar</CancelPrintButton>

            <PrintButton onClick={handlePrint}>
              <AiFillPrinter size={28} />
              IMPRESSÃO
            </PrintButton>
          </HeaderControls>
        </Header>

        <QRCodePrintArea ref={componentRef} tables={tables} />
      </Content>
    </Container>
  );
};

export default PrintQRCodeArea;
