import React, { useEffect, useState, useCallback } from 'react';

import ReactTooltip from 'react-tooltip';
import { HiX } from 'react-icons/hi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdScreenLockPortrait } from 'react-icons/md';

import { api } from '../../../services/api';
import { numberFormatAsCurrency } from '../../../utils/numberFormat';
import Loading from '../../../components/Loading';

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
import { useToast } from '../../../hooks/toast';
import { ModalInfo } from '../../../components/ModalInfo';

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
  token: string;
  establishment_id: string;
  url_authenticate: string;
  status_table_id: number;
  status_table: IStatusTable;
  orders: IOrder[];
}

export interface IOrderResume {
  id: string;
  customer_name: string;
  items_quantity: number;
  status_order_id: number;
  amount: number;
  amount_formatted: string;
}

interface TableDetailsProps {
  table_id?: string;
  isOpen: boolean;
  setIsOpen: () => void;
  handleRefreshTables: () => void;
}

interface ISecurityCode {
  number: number;
  token: string;
}

export const TableDetails: React.FC<TableDetailsProps> = ({
  table_id,
  isOpen,
  setIsOpen,
  handleRefreshTables,
}) => {
  const [refresh, setRefresh] = useState(false);
  const { addToast } = useToast();
  const [showModalSecurityCode, setShowModalSecurityCode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState<ITable>();
  const [total, setTotal] = useState('');
  const [securityCode, setSecurityCode] = useState('');
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
              status_order_id: order.status_order_id,
            };
          });

          setOrdersResume(dataOrders);
          setRefresh(false);
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
  }, [table_id, refresh]);

  const toggleModalSecurity = useCallback(() => {
    setShowModalSecurityCode(!showModalSecurityCode);
  }, [showModalSecurityCode]);

  const handleGenerateSecurityCode = useCallback(() => {
    if (table) {
      api
        .post<ISecurityCode>('/table-tokens', {
          table_number: table.number,
          establishment_id: table.establishment_id,
        })
        .then(response => {
          setSecurityCode(response.data.token);
          toggleModalSecurity();
          handleRefreshTables();
          setRefresh(true);
        })
        .catch(err => {
          addToast({
            type: 'error',
            title: 'Não Permitido',
            description: err.response.data.message
              ? err.response.data.message
              : 'Erro na solicitação',
          });
        });
    }
  }, [table, addToast, toggleModalSecurity, handleRefreshTables]);

  return (
    <Container is_show={isOpen}>
      <ModalInfo
        title="Código com sucesso!"
        message={`MESA: ${table?.number} | CÓDIGO DE SEGURANÇA: ${securityCode}`}
        isOpen={showModalSecurityCode}
        setIsOpen={toggleModalSecurity}
      />
      <TableDetailsContent>
        <TableDetailsHeader>
          <h4>{`Mesa ${table?.number}`}</h4>
          <div className="controls">
            {table?.token ? (
              <span className="codeText">{`Código: ${table?.token}`}</span>
            ) : (
              <>
                <button
                  data-tip
                  data-for="genSecurityCode"
                  className="genSecurityCode"
                  type="button"
                  onClick={handleGenerateSecurityCode}
                >
                  <MdScreenLockPortrait size={25} color="#ff9000" />
                </button>
                <ReactTooltip
                  id="genSecurityCode"
                  type="warning"
                  effect="solid"
                  delayShow={500}
                >
                  <span>Gerar Código de Segurança</span>
                </ReactTooltip>
              </>
            )}
            <button className="close" type="button" onClick={setIsOpen}>
              <HiX size={25} color="#3c3c3c" />
            </button>
          </div>
        </TableDetailsHeader>
        <TableDetailsMain>
          <h3>Pedidos:</h3>
          {isLoading && <Loading />}
          {ordersResume &&
            ordersResume.map(item => (
              <OrderContainer key={item.id}>
                <CustomerName>{item.customer_name}</CustomerName>
                <OrderResume>
                  <small>
                    {(item.status_order_id === 7 && (
                      <small className="orderCanceled">Cancelado</small>
                    )) ||
                      (item.items_quantity === 1
                        ? `${item.items_quantity} Item`
                        : `${item.items_quantity} Itens`)}
                  </small>
                  <small>{item.amount_formatted}</small>
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
