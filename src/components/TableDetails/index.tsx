import React, { useEffect, useState } from 'react';

import { HiX } from 'react-icons/hi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { api } from '../../services/api';
import { numberFormatAsCurrency } from '../../utils/numberFormat';
import Loading from '../Loading';

import {
  Container,
  TableDetailsContent,
  TableDetailsHeader,
  TableDetailsMain,
  OrderContainer,
  CustomerName,
  OrderResume,
  TableDetailsFooter,
  TotalTable,
  PaymentButton,
} from './styles';

interface IWaiter {
  name: string;
  avatar_url: string;
}

interface IStatusTable {
  id: number;
  name: string;
}

interface IOrderProducts {
  id: string;
  product_id: string;
  details: string;
  price: number;
  quantity: number;
  order_id: string;
}

interface IOrder {
  id: string;
  status_order_id: number;
  customer_name: string;
  order_products: IOrderProducts[];
}

interface ITable {
  id: string;
  number: number;
  waiter: IWaiter;
  url_authenticate: string;
  status_table_id: number;
  status_table: IStatusTable;
  orders: IOrder[];
}

export interface IOrderResume {
  id: string;
  customer_name: string;
  items_quantity: number;
  amount: number;
  amount_formatted: string;
}

interface TableDetailsProps {
  table_id?: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

export const TableDetails: React.FC<TableDetailsProps> = ({
  table_id,
  isOpen,
  setIsOpen,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState<ITable>();
  const [total, setTotal] = useState('');
  const [ordersResume, setOrdersResume] = useState<IOrderResume[]>();

  useEffect(() => {
    if (table_id) {
      api
        .get<ITable>(`/tables/${table_id}`)
        .then(response => {
          setTable(response.data);

          const dataOrders = response.data.orders.map(order => {
            const qtd = order.order_products.reduce(
              (acc, item) => acc + item.quantity,
              0,
            );

            const amt = order.order_products.reduce(
              (accumulator, product) => {
                accumulator.total += product.quantity * product.price;
                return accumulator;
              },
              { total: 0 },
            );
            return {
              id: order.id,
              customer_name: order.customer_name,
              items_quantity: qtd,
              amount: amt.total,
              amount_formatted: numberFormatAsCurrency(amt.total),
            };
          });

          setOrdersResume(dataOrders);

          const summary = dataOrders.reduce(
            (acc, item) => acc + item.amount,
            0,
          );
          setTotal(numberFormatAsCurrency(summary));
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    setIsLoading(false);
  }, [table_id]);

  return (
    <Container is_show={isOpen}>
      <TableDetailsContent>
        <TableDetailsHeader>
          <span>{`Mesa ${table?.number}`}</span>
          <button type="button" onClick={setIsOpen}>
            <HiX size={30} />
          </button>
        </TableDetailsHeader>
        <TableDetailsMain>
          <h3>Pedidos:</h3>
          {isLoading && <Loading />}
          {ordersResume &&
            ordersResume.map(item => (
              <OrderContainer key={item.id}>
                <CustomerName>{item.customer_name}</CustomerName>
                <OrderResume>
                  <span>{`${item.items_quantity} Itens`}</span>
                  <h4>{item.amount_formatted}</h4>
                </OrderResume>
              </OrderContainer>
            ))}
        </TableDetailsMain>
        <TableDetailsFooter>
          <TotalTable>
            <span>Total:</span>
            <h2>{total}</h2>
          </TotalTable>
          <PaymentButton>
            <RiMoneyDollarCircleLine size={30} />
            PAGAMENTO
          </PaymentButton>
        </TableDetailsFooter>
      </TableDetailsContent>
    </Container>
  );
};
