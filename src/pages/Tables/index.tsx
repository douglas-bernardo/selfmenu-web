import React, { useEffect, useState, useCallback } from 'react';

import { AiOutlineQrcode } from 'react-icons/ai';
import { HiOutlinePlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { Container, Content } from '../../components/Container';

import { TableDetails } from './TableDetails';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import {
  Main,
  TableContent,
  TableContentHeader,
  Title,
  HeaderControls,
  CRCodeGenButton,
  TablesSection,
  SectionHeader,
  TablesSectionBody,
} from './styles';

import { api } from '../../services/api';
import Loading from '../../components/Loading';
import PrintQRCodeArea from '../../components/PrintQRCodeArea';

import { TableItem } from './TableItem';

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

type IFilterResult = [Table[], Table[], Table[]];

export const Tables: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPrintArea, setShowPrintArea] = useState(false);
  const [showTableDetails, setShowTableDetails] = useState(false);

  const [tables, setTables] = useState<Table[]>([]);
  const [closingTables, setClosingTables] = useState<Table[]>([]);
  const [busyTables, setBusyTables] = useState<Table[]>([]);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);

  const [selectedTable, setSelectedTable] = useState<string>();

  useEffect(() => {
    api
      .get<Table[]>(`/tables`)
      .then(response => {
        const [available, busy, closing] = response.data.reduce(
          (result: IFilterResult, item: Table) => {
            switch (item.status_table_id) {
              case 1:
                result[0].push(item);
                break;

              case 2:
                result[1].push(item);
                break;

              case 3:
                result[2].push(item);
                break;

              default:
                break;
            }
            return result;
          },
          [[], [], []],
        );

        setClosingTables(closing);
        setBusyTables(busy);
        setAvailableTables(available);

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

                <TablesSection>
                  <SectionHeader>
                    <h4>Em Fechamento</h4>

                    <div className="line" />
                  </SectionHeader>
                  <TablesSectionBody>
                    {closingTables.map(table => (
                      <TableItem
                        key={table.id}
                        table={table}
                        handleShowDetails={handleShowTableDetails}
                      />
                    ))}
                  </TablesSectionBody>
                </TablesSection>

                <TablesSection>
                  <SectionHeader>
                    <h4>Ocupadas</h4>

                    <div className="line" />
                  </SectionHeader>
                  <TablesSectionBody>
                    {busyTables.map(table => (
                      <TableItem
                        key={table.id}
                        table={table}
                        handleShowDetails={handleShowTableDetails}
                      />
                    ))}
                  </TablesSectionBody>
                </TablesSection>

                <TablesSection>
                  <SectionHeader>
                    <h4>Disponíveis</h4>

                    <div className="line" />
                  </SectionHeader>
                  <TablesSectionBody>
                    {availableTables.map(table => (
                      <TableItem
                        key={table.id}
                        table={table}
                        handleShowDetails={handleShowTableDetails}
                      />
                    ))}
                  </TablesSectionBody>
                </TablesSection>
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
