import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';

import { FaRegClock } from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import {
  Main,
  MainHeaderControls,
  OrdersContent,
  BackOrders,
  BackOrdersHeader,
  DoneOrders,
  DoneOrdersHeader,
  InProcessOrders,
  InProcessOrdersHeader,
  OrdersContainer,
  ToggleScreenOrdersContainer,
  InProgressButton,
  DoneButton,
} from './styles';

import { api } from '../../services/api';
import Loading from '../../components/Loading';
import { useToast } from '../../hooks/toast';
import { OrderItems } from './OrderItems';

const selectCustomStyles = {
  container: base => ({
    ...base,
    minWidth: 300,
    marginLeft: 10,
  }),
};

interface IOptions {
  value: string;
  label: string;
}

interface IEstablishment {
  id: string;
  name: string;
}

interface IOrder {
  id: string;
  table_token: string;
  status_order_id: number;
  establishment_id: string;
  table_id: string;
  customer_name: string;
  order_products: [
    {
      id: string;
      details: string;
      price: number;
      quantity: number;
      product: {
        id: string;
        name: string;
        photo_url: string;
      };
    },
  ];
  table: {
    number: number;
  };
}

export const Orders: React.FC = () => {
  const { addToast } = useToast();
  const [isSelected, setIsSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [establishmentOptions, setEstablishmentOptions] = useState<IOptions[]>(
    [],
  );

  const [establishmentSelected, setEstablishmentSelected] = useState<
    IOptions | undefined
  >();

  const [backOrders, setBackOrders] = useState<IOrder[]>([]);
  const [inProcessOrders, setInProcessOrders] = useState<IOrder[]>([]);
  const [doneOrders, setDoneOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    api
      .get<IEstablishment[]>(`/establishments`, {
        params: {
          status: true,
        },
      })
      .then(response => {
        const options = response.data.map((opt: IEstablishment) => {
          return { value: opt.id, label: opt.name };
        });
        if (!options) return;
        setEstablishmentOptions(options);
        setEstablishmentSelected(options[0] || undefined);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (establishmentSelected?.value) {
      api
        .get<IOrder[]>('/orders/list-establishment-orders', {
          params: {
            establishment_id: establishmentSelected?.value,
            status_order_id: [1, 2, 3],
          },
        })
        .then(response => {
          const backOrdersData = response.data.filter(
            order => order.status_order_id === 1,
          );

          const inProcessOrdersData = response.data.filter(
            order => order.status_order_id === 2,
          );

          const doneOrdersData = response.data.filter(
            order => order.status_order_id === 3,
          );

          setBackOrders(backOrdersData);
          setInProcessOrders(inProcessOrdersData);
          setDoneOrders(doneOrdersData);
          setIsLoading(false);
          setRefresh(false);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }, [establishmentSelected?.value, refresh]);

  const handleSelectEstablishment = useCallback((selected: any) => {
    setEstablishmentSelected(selected);
  }, []);

  const updateOrderStatus = useCallback(
    (order_id: string, status_id: number) => {
      api
        .patch(`/orders/${order_id}/update-status`, {
          status_order_id: status_id,
        })
        .then(() => {
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
    },
    [addToast],
  );

  const handleSendOrderToPreparation = useCallback(
    (order_id: string) => {
      setIsLoading(true);
      updateOrderStatus(order_id, 2);
    },
    [updateOrderStatus],
  );

  const handleSetOrderAsDone = useCallback(
    (order_id: string) => {
      updateOrderStatus(order_id, 3);
      setIsLoading(true);
    },
    [updateOrderStatus],
  );

  const handleBackToQueue = useCallback(
    (order_id: string) => {
      setIsLoading(true);
      updateOrderStatus(order_id, 1);
    },
    [updateOrderStatus],
  );

  const handleSendOrderToCustomer = useCallback(
    (order_id: string) => {
      updateOrderStatus(order_id, 4);

      addToast({
        type: 'success',
        title: 'Pedido enviado ao cliente',
      });
    },
    [updateOrderStatus, addToast],
  );

  const toggleScreenSelected = useCallback(() => {
    setIsSelected(!isSelected);
  }, [isSelected]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Pedidos</h1>
        </Header>
        <Main>
          <MainHeaderControls>
            {!isLoading && (
              <Select
                onChange={handleSelectEstablishment}
                options={establishmentOptions}
                placeholder="Selecione o estabelecimento"
                styles={selectCustomStyles}
                defaultValue={establishmentSelected}
              />
            )}
            <ToggleScreenOrdersContainer>
              <InProgressButton
                type="button"
                onClick={toggleScreenSelected}
                isSelected={!isSelected}
                disabled={!isSelected}
              >
                <FaRegClock />
                Preparando
              </InProgressButton>
              <DoneButton
                type="button"
                onClick={toggleScreenSelected}
                isSelected={isSelected}
                disabled={isSelected}
              >
                <IoFastFood />
                Finalizados
              </DoneButton>
            </ToggleScreenOrdersContainer>
          </MainHeaderControls>
          <OrdersContent>
            {isSelected ? (
              <DoneOrders>
                <DoneOrdersHeader>Finalizados</DoneOrdersHeader>
                <OrdersContainer>
                  <OrderItems
                    orders={doneOrders}
                    tooltip_text="Enviar ao cliente"
                    tooltip_theme="success"
                    handleOrderStatus={handleSendOrderToCustomer}
                  />
                </OrdersContainer>
              </DoneOrders>
            ) : (
              <>
                <BackOrders>
                  <BackOrdersHeader>Em espera</BackOrdersHeader>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <OrdersContainer>
                      <OrderItems
                        orders={backOrders}
                        tooltip_text="Preparar"
                        handleOrderStatus={handleSendOrderToPreparation}
                      />
                    </OrdersContainer>
                  )}
                </BackOrders>

                <div className="divider" />

                <InProcessOrders>
                  <InProcessOrdersHeader>Em Preparação</InProcessOrdersHeader>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <OrdersContainer>
                      <OrderItems
                        orders={inProcessOrders}
                        tooltip_text="Mover p/ Pronto"
                        handleOrderStatus={handleSetOrderAsDone}
                        handleRevertStatus={handleBackToQueue}
                      />
                    </OrdersContainer>
                  )}
                </InProcessOrders>
              </>
            )}
          </OrdersContent>
        </Main>
      </Content>
    </Container>
  );
};
