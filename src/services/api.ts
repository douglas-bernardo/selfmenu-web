/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
