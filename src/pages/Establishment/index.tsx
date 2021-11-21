import React, { useEffect, useState } from 'react';

import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import {
  Main,
  ProductContent,
  ProductContentHeader,
  ProductTable,
} from './styles';

import Loading from '../../components/Loading';
import { BreadCrumb } from '../../components/BreadCrumb';
import { BreadCrumbItem } from '../../components/BreadCrumbItem';
import { api } from '../../services/api';
import Tag from '../../components/Tag';

interface IEstablishmentType {
  id: number;
  name: string;
}

interface IEstablishment {
  id: string;
  name: string;
  cnpj: number;
  description?: string;
  subdomain: string;
  establishment_type_id: number;
  establishment_type: IEstablishmentType;
  active: boolean;
}

export const Establishments: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [establishments, setEstablishments] = useState<IEstablishment[]>([]);

  useEffect(() => {
    api
      .get<IEstablishment[]>(`/establishments`)
      .then(response => {
        setEstablishments(response.data);
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
            <BreadCrumbItem label="Estabelecimentos" />
          </BreadCrumb>
        </Header>
        <Main>
          <ProductContent>
            <ProductContentHeader>
              <Link to="/settings/establishments/new">
                Novo Estabelecimento
              </Link>
            </ProductContentHeader>
            <ProductTable>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Tipo de Estabelecimento</th>
                  <th>Sub-domínio</th>
                  <th>Ativo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {establishments &&
                  establishments.map(establishment => (
                    <tr key={establishment.id}>
                      <td>{establishment.name}</td>
                      <td>{establishment.description}</td>
                      <td>{establishment.establishment_type.name}</td>
                      <td>{establishment.subdomain}</td>
                      <td>
                        <Tag
                          theme={establishment.active ? 'success' : 'warning'}
                        >
                          {establishment.active ? 'Ativo' : 'Inativo'}
                        </Tag>
                      </td>
                      <td>
                        <Link
                          data-tip
                          data-for="editButton"
                          to={{
                            pathname: `/settings/establishments/edit`,
                            state: {
                              establishment_id: establishment.id,
                            },
                          }}
                        >
                          <FaRegEdit size={28} color="#3c3c3c" />
                        </Link>
                        <ReactTooltip
                          id="editButton"
                          type="info"
                          effect="solid"
                          delayShow={1000}
                        >
                          <span>Editar</span>
                        </ReactTooltip>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </ProductTable>
            {isLoading && <Loading />}
          </ProductContent>
        </Main>
      </Content>
    </Container>
  );
};
