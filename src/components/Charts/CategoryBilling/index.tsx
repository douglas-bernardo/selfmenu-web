import React from 'react';
import Chart from 'react-apexcharts';

import { Container } from './styles';

const series = [44, 55, 41, 17, 15];

const ChartOption = {
  chart: {
    type: 'donut',
  },
  title: {
    text: 'Faturamento - Categorias',
    align: 'left',
    margin: 0,
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: undefined,
      color: '#263238',
    },
  },
  labels: ['Bebidas', 'Hamburguers', 'Pizzas', 'Aperitivos', 'Entradas'],
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '50%',
        labels: {
          show: true,
        },
      },
    },
  },
  noData: {
    text: 'Sem Dados',
  },
} as {};

export const CategoryBilling: React.FC = () => {
  return (
    <Container>
      <Chart options={ChartOption} series={series} type="donut" height={350} />
    </Container>
  );
};
