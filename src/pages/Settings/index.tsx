import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import waiter from '../../assets/waiter.svg';
import establishment from '../../assets/establishment.png';

import {
  Main,
  SettingsContent,
  SettingsContentHeader,
  SettingsListContainer,
  CardConfig,
} from './styles';

export const Settings: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Configurações</h1>
        </Header>
        <Main>
          <SettingsContent>
            <SettingsContentHeader>
              <h2>Ajuste as configurações do Selfmenu</h2>
            </SettingsContentHeader>
            <SettingsListContainer>
              <CardConfig>
                <Link to="/settings/establishments">
                  <img src={establishment} alt="waiter" />
                  <div className="cardContent">
                    <h3>Meus Estabelecimentos</h3>
                    <p>Gerencie seu negócio</p>
                  </div>
                </Link>
              </CardConfig>

              {/* <CardConfig>
                <Link to="/settings/tables">
                  <img src={table} alt="waiter" />
                  <div className="cardContent">
                    <h3>Mesas</h3>
                    <p>Defina a sua quantidades e capacidade de mesas</p>
                  </div>
                </Link>
              </CardConfig> */}

              {/* <CardConfig>
                <Link to="/settings/menus">
                  <img src={menu} alt="menu" />
                  <div className="cardContent">
                    <h3>Cardápios</h3>
                    <p>Adicione e gerencie seus cardápios digitais</p>
                  </div>
                </Link>
              </CardConfig> */}

              <CardConfig>
                <Link to="/settings/waiters">
                  <img src={waiter} alt="waiter" />
                  <div className="cardContent">
                    <h3>Garçons</h3>
                    <p>Adicione e gerencie sua equipe de garçons</p>
                  </div>
                </Link>
              </CardConfig>
            </SettingsListContainer>
          </SettingsContent>
        </Main>
      </Content>
    </Container>
  );
};
