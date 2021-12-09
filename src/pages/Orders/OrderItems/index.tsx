import React from 'react';
import ReactTooltip from 'react-tooltip';
import { FaFire } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { FiSend } from 'react-icons/fi';
import { BsArrowCounterclockwise } from 'react-icons/bs';

import {
  Container,
  Order,
  OrderHeader,
  ActionOrderButton,
  OrderItem,
  OrderItemsContainer,
  ItemInfo,
} from './styles';

interface PropIcons {
  [key: number]: Object;
}

const icons: PropIcons = {
  1: <FaFire size={30} />,
  2: <IoFastFoodOutline size={30} />,
  3: <FiSend size={30} />,
};

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

interface OrderItemProps {
  orders: IOrder[];
  tooltip_text: string;
  tooltip_theme?: 'dark' | 'error' | 'info' | 'light' | 'success' | 'warning';
  handleOrderStatus: (order_id: string) => void;
  handleRevertStatus?: (order_id: string) => void;
}

export const OrderItems: React.FC<OrderItemProps> = ({
  orders,
  tooltip_text,
  handleOrderStatus,
  handleRevertStatus,
}) => {
  return (
    <Container>
      {orders.map(order => (
        <Order key={order.id}>
          <OrderHeader>
            <h4>{`Cliente: ${order.customer_name} | Mesa: ${order.table.number}`}</h4>

            <div className="controls">
              {order.status_order_id === 2 &&
                typeof handleRevertStatus === 'function' && (
                  <>
                    <ActionOrderButton
                      type="button"
                      data-tip
                      data-for="backOrder"
                      onClick={() => handleRevertStatus(order.id)}
                    >
                      <BsArrowCounterclockwise className="back" size={30} />
                    </ActionOrderButton>
                    <ReactTooltip
                      id="backOrder"
                      type="info"
                      effect="solid"
                      delayShow={1000}
                    >
                      <span>Voltar para fila</span>
                    </ReactTooltip>
                  </>
                )}

              <ActionOrderButton
                type="button"
                data-tip
                data-for={tooltip_text}
                onClick={() => handleOrderStatus(order.id)}
              >
                {icons[order.status_order_id]}
              </ActionOrderButton>
              <ReactTooltip
                id={tooltip_text}
                type="info"
                effect="solid"
                delayShow={1000}
              >
                <span>{tooltip_text}</span>
              </ReactTooltip>
            </div>
          </OrderHeader>
          <OrderItemsContainer>
            {order.order_products.map(item => (
              <OrderItem key={item.id}>
                <img src={item.product.photo_url} alt="cover" />
                <ItemInfo>
                  <h5>{`${item.quantity} x ${item.product.name}`}</h5>
                  <p>{item.details}</p>
                </ItemInfo>
              </OrderItem>
            ))}
          </OrderItemsContainer>
        </Order>
      ))}
    </Container>
  );
};
