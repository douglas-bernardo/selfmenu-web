import React from 'react';

import { AiFillStar } from 'react-icons/ai';

import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import money from '../../assets/money.svg';
import chartMoneyUp from '../../assets/chart-money-up.svg';
import chartMoneyDown from '../../assets/chart-money-down.svg';
import bagMoney from '../../assets/bag-money.svg';

import {
  BestSellersContainer,
  BestSellersTable,
  CardsContainer,
  DataCard,
  Main,
} from './styles';
import { HistoricalBilling } from '../../components/Charts/HistoricalBilling';
import { CategoryBilling } from '../../components/Charts/CategoryBilling';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Dashboard</h1>
        </Header>
        <Main>
          <CardsContainer>
            <DataCard>
              <img className="data-card-logo" src={money} alt="logo" />
              <div className="data-card-content">
                <small>Saldo Anterior (mês)</small>
                <h2>R$ 26.000,00</h2>
              </div>
            </DataCard>
            <DataCard>
              <img className="data-card-logo" src={chartMoneyUp} alt="logo" />
              <div className="data-card-content">
                <small>Faturamento</small>
                <h2>R$ 45.050,00</h2>
              </div>
            </DataCard>
            <DataCard>
              <img className="data-card-logo" src={chartMoneyDown} alt="logo" />
              <div className="data-card-content">
                <small>Despesas</small>
                <h2>R$ 13.985,00</h2>
              </div>
            </DataCard>
            <DataCard>
              <img className="data-card-logo" src={bagMoney} alt="logo" />
              <div className="data-card-content">
                <small>Caixa</small>
                <h2>R$ 35.500,36</h2>
              </div>
            </DataCard>
          </CardsContainer>

          <div className="horizontalRowChart">
            <HistoricalBilling />
            <CategoryBilling />
          </div>

          <BestSellersContainer>
            <header>
              <h2>Mais Vendidos</h2>
            </header>
            <BestSellersTable>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th colSpan={2}>Produto</th>
                  <th>Categoria</th>
                  <th>Classificação</th>
                  <th>Quantidade Vendas</th>
                  <th>Faturamento</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1º</td>
                  <td className="product">
                    <img
                      className="productCover"
                      src="https://www.sabornamesa.com.br/media/k2/items/cache/b9ad772005653afce4d4bd46c2efe842_XL.jpg"
                      alt="ProductImage"
                    />
                  </td>
                  <td>Monster Burguer</td>
                  <td>Hamburguers</td>
                  <td>
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="grey" />
                  </td>
                  <td>1.548</td>
                  <td>R$ 750,63</td>
                </tr>

                <tr>
                  <td>2º</td>
                  <td className="product">
                    <img
                      className="productCover"
                      src="https://images.tcdn.com.br/img/img_prod/795791/platter_box_para_presente_brunch_ou_aperitivo_camelia_555_1_fef2f1977be604158ae347e7440aa465.jpg"
                      alt="ProductImage"
                    />
                  </td>
                  <td>Hamburguers</td>
                  <td>Aperitivos</td>
                  <td>
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="grey" />
                    <AiFillStar className="grey" />
                  </td>
                  <td>850</td>
                  <td>R$ 550,00</td>
                </tr>

                <tr>
                  <td>3º</td>
                  <td className="product">
                    <img
                      className="productCover"
                      src="https://www.anamariabrogui.com.br/assets/uploads/receitas/fotos/usuario-1909-9d0ed24e3a5b3a30e48dc6e746ebb833.jpg"
                      alt="ProductImage"
                    />
                  </td>
                  <td>Sorvete de Morando</td>
                  <td>Sobremesas</td>
                  <td>
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                    <AiFillStar className="gold" />
                  </td>
                  <td>450</td>
                  <td>R$ 250,00</td>
                </tr>
              </tbody>
            </BestSellersTable>
          </BestSellersContainer>
        </Main>
      </Content>
    </Container>
  );
};
