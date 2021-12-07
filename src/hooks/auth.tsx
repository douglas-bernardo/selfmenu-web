import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

interface IAccount {
  id: string;
  email: string;
  profile_name: string;
  avatar_url: string;
  plan: {
    id: number;
    name: string;
    description: string;
  };
}

interface AuthState {
  token: string;
  account: IAccount;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  account: IAccount;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateAccount(account: IAccount): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@selfmenu:token');
    const account = localStorage.getItem('@selfmenu:account');

    if (token && account) {
      console.log(JSON.parse(account));
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, account: JSON.parse(account) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, account } = response.data;

    localStorage.setItem('@selfmenu:token', token);
    localStorage.setItem('@selfmenu:account', JSON.stringify(account));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, account });
    console.log(account);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@selfmenu:token');
    localStorage.removeItem('@selfmenu:account');

    setData({} as AuthState);
  }, []);

  const updateAccount = useCallback(
    (account: IAccount) => {
      localStorage.setItem('@selfmenu:account', JSON.stringify(account));
      setData({
        token: data.token,
        account,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        account: data.account,
        token: data.token,
        signIn,
        signOut,
        updateAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
