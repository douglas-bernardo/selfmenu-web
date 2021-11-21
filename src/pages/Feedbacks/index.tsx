import React, { useEffect, useState } from 'react';

import { FiAward } from 'react-icons/fi';

import { Container, Content } from '../../components/Container';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';

import userDefaultImage from '../../assets/user.svg';

import { Main, FeedbackContent, FeedBackContainer } from './styles';
import { api } from '../../services/api';
import Loading from '../../components/Loading';
import RateStarts from '../../components/RateStarts';

interface Feedback {
  id: number;
  user_name: string;
  title: string;
  date: string;
  rate: number;
  description: string;
}

export const Feedbacks: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<Feedback[]>(`/feedbacks`)
      .then(response => {
        setFeedbacks(response.data);
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
          <h1 className="pageTitle">Feedbacks</h1>
        </Header>
        <Main>
          <FeedbackContent>
            <header>
              <FiAward size={30} />
              <h2>Principais Avaliações dos Clientes</h2>
            </header>
            {isLoading && <Loading />}
            {feedbacks &&
              feedbacks.map(feedback => (
                <FeedBackContainer key={feedback.id}>
                  <div className="evaluationIdentity">
                    <img src={userDefaultImage} alt="user feedback" />
                    <span>{feedback.user_name}</span>
                  </div>
                  <div className="evaluationRate">
                    <span>
                      <RateStarts stars={feedback.rate} />
                    </span>
                    <p>{feedback.title}</p>
                  </div>
                  <div className="evaluationDate">{`Avaliado em ${feedback.date}`}</div>
                  <div className="evaluationDescription">
                    <p>{feedback.description}</p>
                  </div>
                </FeedBackContainer>
              ))}
          </FeedbackContent>
        </Main>
      </Content>
    </Container>
  );
};
