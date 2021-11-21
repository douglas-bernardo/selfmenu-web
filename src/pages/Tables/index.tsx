import React, { useEffect, useState, useCallback } from 'react';

import { AiOutlineQrcode } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';
import { GoTasklist } from 'react-icons/go';
import { BiLoaderCircle } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { HiOutlinePlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { Container, Content } from '../../components/Container';

import { TableDetails } from '../../components/TableDetails';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import waiterLogo from '../../assets/waiter.svg';

import {
  Main,
  TableContent,
  TableContentHeader,
  Title,
  HeaderControls,
  CRCodeGenButton,
  TablesContainer,
  TableItem,
} from './styles';

import { api } from '../../services/api';
import Loading from '../../components/Loading';
import PrintQRCodeArea from '../../components/PrintQRCodeArea';

const icons = {
  'Aguardando Pedido': <BsClockHistory size={28} />,
  'Aceito [fila]': <GoTasklist size={28} />,
  'Em Preparação': <BiLoaderCircle size={28} />,
  Entregue: <IoFastFoodOutline size={28} />,
};

interface IWaiter {
  name: string;
  avatar_url: string;
}

interface IStatusTable {
  id: number;
  name: string;
}

interface IOrder {
  id: number;
  status_order_id: number;
}

interface Table {
  id: string;
  number: number;
  waiter: IWaiter;
  url_authenticate: string;
  status_table_id: number;
  status_table: IStatusTable;
  orders: IOrder[];
}

export const Tables: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrintArea, setShowPrintArea] = useState(false);
  const [showTableDetails, setShowTableDetails] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>();

  useEffect(() => {
    api
      .get<Table[]>(`/tables`)
      .then(response => {
        setTables(response.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  const toggleShowPrintArea = useCallback(() => {
    setShowPrintArea(!showPrintArea);
  }, [showPrintArea]);

  const handleShowTableDetails = useCallback((table_id: string) => {
    setSelectedTable(table_id);
    setShowTableDetails(true);
  }, []);

  const handleCloseTableDetails = useCallback(() => {
    setShowTableDetails(false);
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Mesas</h1>
        </Header>
        {(isLoading && <Loading />) ||
          (showPrintArea ? (
            <PrintQRCodeArea setIsOpen={toggleShowPrintArea} tables={tables} />
          ) : (
            <Main>
              <TableContent withdrawn={showTableDetails}>
                <TableContentHeader>
                  <Title>
                    <h3>Acompanhamento das mesas</h3>
                  </Title>

                  <HeaderControls>
                    <CRCodeGenButton onClick={toggleShowPrintArea}>
                      <AiOutlineQrcode size={30} />
                      <h3>Gerar CQCode das mesas</h3>
                    </CRCodeGenButton>

                    <Link to="/tables/new">
                      <HiOutlinePlus size={30} />
                    </Link>
                  </HeaderControls>
                </TableContentHeader>
                <TablesContainer>
                  {tables.map(table => (
                    <TableItem
                      key={table.id}
                      status={Number(table.status_table_id)}
                    >
                      <button
                        type="button"
                        onClick={() => handleShowTableDetails(table.id)}
                      >
                        <header>
                          <span>{table.number}</span>
                          <h4>{table.status_table.name}</h4>
                        </header>
                        <main>{`${table.orders.length} pedidos`}</main>
                        <footer>
                          <img
                            src={table.waiter.avatar_url || waiterLogo}
                            alt="waiterLogo"
                          />
                          <div>
                            <small>Garçom:</small>
                            <p>{table.waiter.name}</p>
                          </div>
                        </footer>
                      </button>
                    </TableItem>
                  ))}
                </TablesContainer>
              </TableContent>

              <TableDetails
                table_id={selectedTable}
                isOpen={showTableDetails}
                setIsOpen={handleCloseTableDetails}
              />
            </Main>
          ))}
      </Content>
    </Container>
  );
};
