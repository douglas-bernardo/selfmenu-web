import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartLine, FaComments, FaSignOutAlt } from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { GiTable } from 'react-icons/gi';
import { BiFoodMenu } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { IoTicketOutline } from 'react-icons/io5';

import selfmenuLogo from '../../assets/selfmenu-logo.svg';

import { Aside } from './styles';

import { useAuth } from '../../hooks/auth';

interface Page {
  page: string;
  label: string;
  icon: Object;
}

const pages: Array<Page> = [
  { page: '/dashboard', label: 'Dashboard', icon: <FaChartLine /> },
  { page: '/orders', label: 'Pedidos', icon: <IoFastFood /> },
  { page: '/categories', label: 'Categorias', icon: <IoTicketOutline /> },
  { page: '/products', label: 'Produtos', icon: <BiFoodMenu /> },
  { page: '/tables', label: 'Mesas', icon: <GiTable /> },
  { page: '/feedbacks', label: 'Feedbacks', icon: <FaComments /> },
  { page: '/settings', label: 'Configurações', icon: <FiSettings /> },
];

export const Sidebar: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Aside>
      <img src={selfmenuLogo} className="logo" alt="logo" />
      <ul>
        {pages.map(({ label, page, icon }) => (
          <li key={page}>
            <NavLink key={page} to={page} activeClassName="active">
              {icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button type="button" title="Deslogar" onClick={signOut}>
        <FaSignOutAlt />
        Log out
      </button>
    </Aside>
  );
};
