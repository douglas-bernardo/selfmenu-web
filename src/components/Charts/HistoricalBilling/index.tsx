import React from 'react';
import Chart from 'react-apexcharts';

import { Container } from './styles';

const series = [
  {
    name: 'Faturamento',
    data: [1050, 2041, 3005, 5100.0, 4980, 6250, 6999, 9001, 8148],
  },
];

const ChartOption = {
  chart: {
    type: 'line',
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ['#77B6EA', '#FF0A54'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: 'Faturamento Histórico',
    align: 'left',
    style: {
      fontSize: '22px',
      fontWeight: 'bold',
      fontFamily: undefined,
      color: '#263238',
    },
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5,
    },
  },
  markers: {
    size: 0.5,
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    labels: {
      hideOverlappingLabels: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    offsetY: -30,
  },
  noData: {
    text: 'Sem Dados',
  },
} as {};

export const HistoricalBilling: React.FC = () => {
  return (
    <Container>
      <Chart options={ChartOption} series={series} type="line" height={350} />
    </Container>
  );
};
