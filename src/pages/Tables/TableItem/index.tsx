import React from 'react';

import waiterLogo from '../../../assets/waiter.svg';
import { Container } from './styles';

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

interface ITable {
  id: string;
  number: number;
  waiter: IWaiter;
  url_authenticate: string;
  status_table_id: number;
  status_table: IStatusTable;
  orders: IOrder[];
}

interface ITableItemProps {
  table: ITable;
  handleShowDetails: (table_id: string) => void;
}

export const TableItem: React.FC<ITableItemProps> = ({
  table,
  handleShowDetails,
}) => {
  return (
    <Container key={table.id} status={Number(table.status_table_id)}>
      <button type="button" onClick={() => handleShowDetails(table.id)}>
        <header>
          <span>{table.number}</span>
          <h4>{table.status_table.name}</h4>
        </header>
        <main>{`${table.orders.length} pedidos`}</main>
        <footer>
          <img src={table.waiter.avatar_url || waiterLogo} alt="waiterLogo" />
          <div>
            <small>Garçom:</small>
            <p>{table.waiter.name}</p>
          </div>
        </footer>
      </button>
    </Container>
  );
};
