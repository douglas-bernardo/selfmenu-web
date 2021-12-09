import React, { useEffect, useState, useCallback, useMemo } from 'react';

import ReactTooltip from 'react-tooltip';
import { HiX } from 'react-icons/hi';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { MdPayment } from 'react-icons/md';
import { MdScreenLockPortrait } from 'react-icons/md';
import { AiOutlineInteraction } from 'react-icons/ai';

import { api } from '../../../services/api';
import { numberFormatAsCurrency } from '../../../utils/numberFormat';
import Loading from '../../../components/Loading';

import {
  Container,
  TableDetailsContent,
  TableDetailsHeader,
  TableDetailsMain,
  OrderContainer,
  OrderHeader,
  OrderPaymentButton,
  CustomerName,
  OrderResume,
  TableDetailsFooter,
  TotalTable,
  PaymentButton,
  OrderInfo,
  TotalAmountPaid,
} from './styles';
import { useToast } from '../../../hooks/toast';
import { ModalInfo } from '../../../components/ModalInfo';
import { PaymentModal } from '../../../components/PaymentModal';
import ModalConfirm from '../../../components/ModalConfirm';

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
  status_order: {
    id: number;
    name: string;
  };
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
  amount: number;
  amount_formatted: string;
  status_order: {
    id: number;
    name: string;
  };
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
  const [isLoading, setIsLoading] = useState(true);

  const [showModalSecurityCode, setShowModalSecurityCode] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmCloseTableModal, setShowConfirmCloseTableModal] = useState(
    false,
  );

  const [table, setTable] = useState<ITable>();
  const [summary, setSummary] = useState({
    paid: 0,
    toPay: 0,
  });

  const [securityCode, setSecurityCode] = useState('');
  const [ordersResume, setOrdersResume] = useState<IOrderResume[]>();

  const [selectedOrder, setSelectedOrder] = useState<IOrderResume>(
    {} as IOrderResume,
  );

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
              status_order: order.status_order,
            };
          });

          const summaryData = dataOrders.reduce(
            (acc, item) => {
              if (item.status_order.id === 6) {
                acc.paid += item.amount;
              } else {
                acc.toPay += item.amount;
              }

              return acc;
            },
            {
              paid: 0,
              toPay: 0,
            },
          );

          setSummary({
            paid: summaryData.paid,
            toPay: summaryData.toPay,
          });

          setOrdersResume(dataOrders);
          setRefresh(false);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    setIsLoading(false);
  }, [table_id, refresh]);

  const amountPaidAsCurrency = useMemo(() => {
    return numberFormatAsCurrency(summary.paid);
  }, [summary.paid]);

  const amountToPayAsCurrency = useMemo(() => {
    return numberFormatAsCurrency(summary.toPay);
  }, [summary.toPay]);

  const toggleModalSecurity = useCallback(() => {
    setShowModalSecurityCode(!showModalSecurityCode);
  }, [showModalSecurityCode]);

  const togglePaymentModal = useCallback(() => {
    setShowPaymentModal(!showPaymentModal);
  }, [showPaymentModal]);

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

  const handleRegisterPayment = useCallback(async (order_id: string) => {
    await api.patch(`/orders/${order_id}/update-status`, {
      status_order_id: 6,
    });
    setRefresh(true);
  }, []);

  const handleRegisterOrderPayment = useCallback(
    (data: IOrderResume) => {
      setSelectedOrder(data);
      togglePaymentModal();
    },
    [togglePaymentModal],
  );

  const toggleCloseTableModal = useCallback(() => {
    setShowConfirmCloseTableModal(!showConfirmCloseTableModal);
  }, [showConfirmCloseTableModal]);

  const handleCloseTable = useCallback(() => {
    if (table_id) {
      api
        .patch(`/tables/${table_id}/close`)
        .then(() => {
          handleRefreshTables();
          setRefresh(true);
          addToast({
            type: 'success',
            title: 'Mesa finalizada e disponível novamente!',
          });
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
  }, [addToast, table_id, handleRefreshTables]);

  const handleConfirmCloseTable = useCallback(() => {
    if (summary.toPay > 0) {
      addToast({
        type: 'error',
        title: 'Não Permitido',
        description: 'Existem pedidos em andamento ou pendentes de pagamento',
      });
      return;
    }
    toggleCloseTableModal();
  }, [summary.toPay, addToast, toggleCloseTableModal]);

  const handleSetTableFree = useCallback(() => {
    if (summary.toPay > 0) {
      addToast({
        type: 'error',
        title: 'Não Permitido',
        description: 'Existem pedidos em andamento ou pendentes de pagamento',
      });
      return;
    }
    if (table_id) {
      api
        .patch(`/tables/${table_id}/close`)
        .then(() => {
          handleRefreshTables();
          setRefresh(true);
          addToast({
            type: 'success',
            title: 'Mesa disponível novamente!',
          });
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
  }, [table_id, summary.toPay, addToast, handleRefreshTables]);

  return (
    <Container is_show={isOpen}>
      <ModalInfo
        title="Código com sucesso!"
        message={`MESA: ${table?.number} | CÓDIGO DE SEGURANÇA: ${securityCode}`}
        isOpen={showModalSecurityCode}
        setIsOpen={toggleModalSecurity}
      />
      <PaymentModal
        order={selectedOrder}
        isOpen={showPaymentModal}
        setIsOpen={togglePaymentModal}
        handlePaymentRegister={handleRegisterPayment}
      />

      <ModalConfirm
        title="Fechamento de Mesa"
        message="Confirma fechamento da mesa?"
        isOpen={showConfirmCloseTableModal}
        setIsOpen={toggleCloseTableModal}
        handleConfirmYes={handleCloseTable}
        confirmNo="Cancelar"
        confirmYes="Confirmar"
        buttonType={{
          theme: {
            confirmYes: 'success_light',
          },
        }}
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

            <button
              data-tip
              data-for="setFreeTable"
              className="setFreeTable"
              type="button"
              disabled={table?.status_table_id === 1}
              style={{
                cursor:
                  table?.status_table_id === 1 ? 'not-allowed' : 'pointer',
              }}
              onClick={handleSetTableFree}
            >
              <AiOutlineInteraction size={25} color="#12A454" />
            </button>
            <ReactTooltip
              id="setFreeTable"
              type="success"
              effect="solid"
              delayShow={500}
            >
              <span>Liberar Mesa</span>
            </ReactTooltip>
            <button className="close" type="button" onClick={setIsOpen}>
              <HiX size={25} color="#969CB2" />
            </button>
          </div>
        </TableDetailsHeader>
        <TableDetailsMain>
          <h3>Pedidos:</h3>
          {isLoading && <Loading />}
          {ordersResume &&
            ordersResume.map(item => (
              <OrderContainer key={item.id}>
                <OrderHeader>
                  <CustomerName>{item.customer_name}</CustomerName>

                  {(item.status_order.id === 4 ||
                    item.status_order.id === 5) && (
                    <>
                      <OrderPaymentButton
                        data-tip
                        data-for="regPayment"
                        onClick={() => handleRegisterOrderPayment(item)}
                      >
                        <MdPayment size={20} />
                      </OrderPaymentButton>

                      <ReactTooltip
                        id="regPayment"
                        type="success"
                        effect="solid"
                        delayShow={500}
                      >
                        <span>Registrar Pagamento</span>
                      </ReactTooltip>
                    </>
                  )}
                </OrderHeader>
                <OrderResume>
                  <small
                    className={`order${
                      item.status_order.id === 7 ? ' canceled' : ''
                    }`}
                  >
                    {item.status_order.name}
                  </small>
                  <OrderInfo>
                    {item.status_order.id !== 7 && (
                      <small>
                        {item.items_quantity === 1
                          ? `${item.items_quantity}Item |`
                          : `${item.items_quantity}Itens |`}
                      </small>
                    )}
                    <small>{item.amount_formatted}</small>
                  </OrderInfo>
                </OrderResume>
              </OrderContainer>
            ))}
        </TableDetailsMain>
        <TableDetailsFooter>
          {ordersResume && ordersResume?.length > 0 && (
            <>
              <TotalAmountPaid>
                <span>Total pago:</span>
                <h3>{amountPaidAsCurrency}</h3>
              </TotalAmountPaid>
              <TotalTable>
                <span>Total à pagar:</span>
                <h2>{amountToPayAsCurrency}</h2>
              </TotalTable>
              <PaymentButton onClick={handleConfirmCloseTable}>
                <RiCheckDoubleFill size={30} />
                Encerrar Mesa
              </PaymentButton>
            </>
          )}
        </TableDetailsFooter>
      </TableDetailsContent>
    </Container>
  );
};
