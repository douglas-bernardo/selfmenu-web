/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import jwt from 'jsonwebtoken';

const apiAuth = axios.create({
  baseURL: 'http://localhost:4444',
});

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('@selfmenu:token');
    if (token && jwt.decode(token)) {
      const decoded: any = jwt.decode(token);
      const expired: boolean = Date.now() > decoded.exp * 1000;
      if (expired) {
        console.log(`token expired: ${expired}`);
        localStorage.removeItem('@selfmenu:token');
        localStorage.removeItem('@selfmenu:account');
        localStorage.setItem('@selfmenu:expired', 'session expired');
        window.location.pathname = '/';
      }
    }
    return config;
  },
  err => {
    console.log('error in getting ', err);
  },
);

export { apiAuth, api };
