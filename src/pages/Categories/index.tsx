import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import Loading from '../../components/Loading';

import coverDefault from '../../assets/default.jpeg';

import { api } from '../../services/api';

import {
  Main,
  CategoryContent,
  CategoryContentHeader,
  ListCategoryContainer,
  CategoryContainer,
} from './styles';

interface ICategory {
  id: number;
  name: string;
  image_cover: string;
  image_cover_url: string;
  active: boolean;
}

export const Categories: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    api
      .get<ICategory[]>(`/categories`)
      .then(response => {
        const categoriesArray = response.data;
        setCategories(categoriesArray);
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
          <h1 className="pageTitle">Categorias</h1>
        </Header>
        <Main>
          <CategoryContent>
            <CategoryContentHeader>
              <Link to="/categories/new">Novo</Link>
              <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar"
              />
            </CategoryContentHeader>
            {isLoading && <Loading />}

            <ListCategoryContainer>
              {categories.map(category => (
                <CategoryContainer key={category.id}>
                  <Link
                    to={{
                      pathname: '/categories/edit',
                      state: {
                        category_id: category.id,
                      },
                    }}
                  >
                    <img
                      src={category.image_cover_url || coverDefault}
                      alt="cover"
                    />
                    <div className="cardContent">
                      <h3>{category.name}</h3>
                      <p>{category.active ? 'Ativo' : 'Inativo'}</p>
                    </div>
                  </Link>
                </CategoryContainer>
              ))}
            </ListCategoryContainer>
          </CategoryContent>
        </Main>
      </Content>
    </Container>
  );
};
