import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Form } from './styles';

import Modal from '../Modal';
import Input from '../Input';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { currencyFormatAsNumber } from '../../utils/numberFormat';
import { Select } from '../Select';

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

interface IModalProps {
  order: IOrderResume;
  isOpen: boolean;
  setIsOpen: () => void;
  handlePaymentRegister: (order_id: string) => Promise<void>;
}

const selectCustomStyles = {
  container: base => ({
    ...base,
    flex: 1,
  }),
};

const paymentTypeOptions = [
  { value: '1', label: 'Dinheiro' },
  { value: '2', label: 'Cartão' },
  { value: '3', label: 'Pix' },
];

export const PaymentModal: React.FC<IModalProps> = ({
  order,
  isOpen,
  setIsOpen,
  handlePaymentRegister,
}) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: { value: string }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          payment_type_id: Yup.string().required(
            'Forma de pagamento é obrigatório',
          ),
          value: Yup.string().required('Valor recebido é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const valuePayment = currencyFormatAsNumber(data.value);

        if (valuePayment < order.amount) {
          formRef.current?.setErrors({
            value: `Valor recebido não pode ser menor que o valor do pedido`,
          });
          return;
        }

        await handlePaymentRegister(order.id);
        setIsOpen();

        addToast({
          type: 'success',
          title: 'Pagamento registrado com sucesso!',
        });
      } catch (err: any | Yup.ValidationError) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Não Permitido',
          description: err.response.data.message
            ? err.response.data.message
            : 'Erro na solicitação',
        });
      }
    },
    [handlePaymentRegister, order.id, order.amount, setIsOpen, addToast],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} width="712px">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
          <h3>Registro Pagamento de Pedido</h3>
        </div>

        <div className="row">
          <div className="label">Pedido Nº:</div>
          <p>859932698875</p>
        </div>

        <div className="row">
          <div className="label">Cliente:</div>
          <p>{order.customer_name}</p>
        </div>

        <div className="row">
          <div className="label">Qtd Itens:</div>
          <p>{order.items_quantity}</p>
        </div>

        <div className="row">
          <div className="label">Valor Total:</div>
          <p>{order.amount_formatted}</p>
        </div>

        <div className="row">
          <div className="label">Forma de Pagamento:</div>
          <Select
            name="payment_type_id"
            options={paymentTypeOptions}
            styles={selectCustomStyles}
            menuPlacement="auto"
            placeholder="Selecione a forma de pagamento"
          />
        </div>

        <div className="row">
          <div className="label">Valor:</div>
          <Input name="value" placeholder="Valor recebido" mask="currency" />
        </div>

        <button type="submit" data-testid="register-payment-button">
          <p className="text">Registrar</p>
        </button>
      </Form>
    </Modal>
  );
};
