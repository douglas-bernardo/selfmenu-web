import React, { forwardRef } from 'react';
import QRCode from 'qrcode.react';

import {
  Container,
  PrintArea,
  TagItemCodePrint,
  TagHeader,
  TagBody,
  TagFooter,
} from './styles';

interface ITable {
  id: string;
  number: number;
  url_authenticate: string;
}

interface IQRCodePrintAreaProps {
  tables: ITable[];
}

const QRCodePrintArea: React.ForwardRefRenderFunction<
  HTMLDivElement,
  IQRCodePrintAreaProps
> = ({ tables }, ref) => {
  return (
    <Container ref={ref}>
      <style type="text/css" media="print">
        {'@page { size: landscape; }'}
      </style>
      <PrintArea>
        {tables.map(item => (
          <TagItemCodePrint key={item.id}>
            <TagHeader>{`Mesa ${item.number}`}</TagHeader>
            <TagBody>
              <QRCode value={item.url_authenticate} />
            </TagBody>
            <TagFooter>Faça Seu Pedido</TagFooter>
          </TagItemCodePrint>
        ))}
      </PrintArea>
    </Container>
  );
};

export default forwardRef(QRCodePrintArea);
