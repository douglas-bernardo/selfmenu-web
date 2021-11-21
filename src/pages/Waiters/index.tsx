import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Container, Content } from '../../components/Container';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import waiterImage from '../../assets/user.svg';

import Loading from '../../components/Loading';
import { Main, WaitersContent } from './styles';
import { api } from '../../services/api';
import { BreadCrumb } from '../../components/BreadCrumb';
import { BreadCrumbItem } from '../../components/BreadCrumbItem';

interface IEstablishment {
  id: string;
  name: string;
}

interface Waiter {
  id: string;
  cpf: number;
  cpf_formatted: string;
  name: string;
  username: string;
  password: string;
  active: boolean;
  avatar: string;
  avatar_url: string;
  establishment: IEstablishment;
}

export const Waiters: React.FC = () => {
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<Waiter[]>('/waiters')
      .then(response => {
        setWaiters(response.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <BreadCrumb>
            <BreadCrumbItem link="/settings" label="Configurações" />
            <BreadCrumbItem label="Garçons" />
          </BreadCrumb>
        </Header>
        <Main>
          <WaitersContent>
            <header>
              <Link to="/settings/waiters/new">Novo</Link>
              <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar"
              />
            </header>
            <table>
              <thead>
                <tr>
                  <th className="centered">Foto</th>
                  <th>Nome</th>
                  <th>Usuário</th>
                  <th className="centered">Estabelecimento</th>
                  <th className="centered">Situação</th>
                  <th className="centered">Ações</th>
                </tr>
              </thead>
              <tbody>
                {waiters &&
                  waiters.map(waiter => (
                    <tr key={waiter.id}>
                      <td className="centered">
                        <img
                          src={
                            waiter.avatar_url ? waiter.avatar_url : waiterImage
                          }
                          className="waiterImage"
                          alt="waiter"
                        />
                      </td>
                      <td>{waiter.name}</td>
                      <td>{waiter.username}</td>
                      <td className="centered">{waiter.establishment.name}</td>
                      <td className="centered">
                        {waiter.active ? 'Ativo' : 'Inativo'}
                      </td>
                      <td className="centered">
                        <Link
                          to={{
                            pathname: `/settings/waiters/edit`,
                            state: {
                              waiter_id: waiter.id,
                            },
                          }}
                        >
                          <FiEdit size={28} />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isLoading && <Loading />}
          </WaitersContent>
        </Main>
      </Content>
    </Container>
  );
};
