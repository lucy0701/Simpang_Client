export * from './kakao';
export * from './util';
export * from './user';
export * from './like';
export * from './contents';

import axios from 'axios';

import { BE_URL } from '@/constants';

export const apiBe = axios.create({
  baseURL: `${BE_URL}/api`,
  timeout: 5_000,
  withCredentials: true,
});

apiBe.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  },
);
