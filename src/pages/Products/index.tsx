import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { AiFillStar } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import Tag from '../../components/Tag';
import Loading from '../../components/Loading';
import Pagination, { PaginationHandles } from '../../components/Pagination';

import {
  Main,
  ProductContent,
  ProductContentHeader,
  ProductTable,
} from './styles';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  available: boolean;
  category_id: number;
  url_photo: string;
  rate: number;
  photo_url: string;
}

export const Products: React.FC = () => {
  const paginationRef = useRef<PaginationHandles>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [totalProducts, setTotalProducts] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(7);

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    api
      .get<IProduct[]>(`/products`, {
        params: {
          offset,
          limit,
        },
      })
      .then(response => {
        setTotalProducts(response.headers['x-total-count']);
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, [offset, limit]);

  const handleOffsetAndLimit = useCallback(
    (_limit: number, _offset: number) => {
      setIsLoading(true);

      setLimit(_limit);
      setOffset(_offset);
    },
    [],
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Produtos</h1>
        </Header>
        <Main>
          <ProductContent>
            <ProductContentHeader>
              <Link to="/products/new">Novo</Link>
              <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar"
              />
            </ProductContentHeader>
            <ProductTable>
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nome/Descrição</th>
                  <th>Classificação</th>
                  <th>Preço</th>
                  <th>Situação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img
                        className="productImage"
                        src={
                          product.photo_url
                            ? product.photo_url
                            : 'images/default.jpeg'
                        }
                        alt="ProductImage"
                      />
                    </td>
                    <td>
                      <strong>{product.name}</strong>
                      <p>{product.description}</p>
                    </td>
                    <td>
                      <AiFillStar className="gold" />
                      <AiFillStar className="gold" />
                      <AiFillStar className="gold" />
                      <AiFillStar className="gold" />
                      <AiFillStar className="grey" />
                      {/* <AiOutlineStar /> */}
                    </td>
                    <td>{product.price}</td>
                    <td>
                      <Tag theme={product.available ? 'success' : 'default'}>
                        {product.available ? 'Disponível' : 'Indisponível'}
                      </Tag>
                    </td>
                    <td>
                      <Link
                        data-tip
                        data-for="editButton"
                        to={{
                          pathname: `/products/edit`,
                          state: {
                            product_id: product.id,
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
            {totalProducts > 0 && (
              <Pagination
                ref={paginationRef}
                count={totalProducts}
                limit={limit}
                pageRangeDisplayed={5}
                onChange={handleOffsetAndLimit}
              />
            )}
          </ProductContent>
        </Main>
      </Content>
    </Container>
  );
};
