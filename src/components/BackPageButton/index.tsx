import React from 'react';
import ReactTooltip from 'react-tooltip';

import { Link } from 'react-router-dom';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';

import { Container } from './styles';

interface BackPageButtonProps {
  page?: string;
}

export const BackPageButton: React.FC<BackPageButtonProps> = ({ page }) => {
  return (
    <Container>
      <Link data-tip data-for="backPage" to={`/${page}`}>
        <HiOutlineArrowCircleLeft size={35} />
      </Link>
      <ReactTooltip id="backPage" type="info" effect="solid" delayShow={500}>
        <span>Voltar</span>
      </ReactTooltip>
    </Container>
  );
};
