import React, { useCallback } from 'react';
import { FaAngleDown, FaUser, FaPowerOff } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { OutSideClick } from '../../hooks/outSideClick';

import defaultAvatar from '../../assets/user.svg';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Content,
  DropdownMenu,
  DropdownMenuContent,
} from './styles';
import { Notifications } from '../Notifications';

export const Header: React.FC = ({ children }) => {
  const { account, signOut } = useAuth();
  const { visible, setVisible, ref } = OutSideClick(false);

  const handleClickButton = useCallback(() => {
    setVisible(prevState => !prevState);
  }, [setVisible]);

  return (
    <Container>
      <div>{children}</div>
      <Content>
        <Notifications />
        <DropdownMenu ref={ref}>
          <button
            className="dropAccountInfo"
            type="button"
            onClick={handleClickButton}
          >
            <img src={account.avatar_url || defaultAvatar} alt="User Logo" />
            <span>{account.profile_name}</span>
            <FaAngleDown className="open-drop" />

            <DropdownMenuContent isVisible={visible}>
              <Link to="/account">
                <FaUser className="drop" />
                <span>Conta</span>
              </Link>
              <Link to="/" onClick={signOut}>
                <FaPowerOff className="drop" />
                <span>Sair</span>
              </Link>
            </DropdownMenuContent>
          </button>
        </DropdownMenu>
      </Content>
    </Container>
  );
};
