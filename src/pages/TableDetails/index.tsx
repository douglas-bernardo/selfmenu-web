import React, { useEffect, useState } from 'react';

import { TiArrowLeftThick } from 'react-icons/ti';

import { Link, useParams } from 'react-router-dom';
import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import {
  Main,
  TableDetailsContent,
  TableDetailsContentHeader,
  OrderDetails,
  OrderTable,
} from './styles';

import { api } from '../../services/api';
import Loading from '../../components/Loading';

interface ItemOrder {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  total_item: number;
}

interface Order {
  id: number;
  number: number;
  status: string;
  items: ItemOrder[];
}

interface Table {
  id: number;
  number: number;
  available: boolean;
  waiter: string;
  order_table: Order;
}

interface TableParams {
  id: string;
}

export const TableDetails: React.FC = () => {
  const params = useParams<TableParams>();

  const [table, setTable] = useState<Table | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    api
      .get<Table>(`/tables/${params.id}`)
      .then(response => {
        const tableData = response.data;

        const tableOrderFormatted = {
          ...tableData,
          order_table: {
            ...tableData.order_table,
            items: tableData.order_table.items.map(item => {
              return {
                ...item,
                total_item: item.quantity * Number(item.price),
              };
            }),
          },
        };

        const total = tableOrderFormatted.order_table.items.reduce(
          (accumulator, item) => {
            accumulator.total += item.total_item;
            return accumulator;
          },
          {
            total: 0,
          },
        );

        setTable(tableOrderFormatted);
        setTotalOrder(total.total);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, [params.id]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Mesa | Detalhes</h1>
        </Header>
        <Main>
          <TableDetailsContent>
            <div className="linkBackPage">
              <Link to="/tables">
                <TiArrowLeftThick size={25} />
                <span>Voltar</span>
              </Link>
            </div>
            {isLoading && <Loading />}
            {table && (
              <>
                <TableDetailsContentHeader>
                  <span>{table.number}</span>
                  <h2>Detalhamento da Mesa</h2>
                </TableDetailsContentHeader>
                <OrderDetails>
                  <header>
                    <h2>
                      <span>Pedido:</span>
                      {table.order_table.number}
                    </h2>
                    <h2>
                      <span>Situação:</span>
                      {table.order_table.status}
                    </h2>
                    <h2>
                      <span>Garçom Resp:</span>
                      {table && table.waiter}
                    </h2>
                  </header>
                  <h1>Itens do Pedido</h1>
                  <OrderTable>
                    <thead>
                      <tr>
                        <th className="description">Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th>Valor Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.order_table.items.map(item => (
                        <tr key={item.id}>
                          <td className="description">{item.product_name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          <td>{item.total_item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </OrderTable>
                  <footer>
                    <h2>Total Mesa</h2>
                    <span>{`R$ ${totalOrder}`}</span>
                  </footer>
                </OrderDetails>
              </>
            )}
          </TableDetailsContent>
        </Main>
      </Content>
    </Container>
  );
};
