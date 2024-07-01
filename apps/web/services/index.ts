import { BE_URL } from '@/constants';
import axios from 'axios';
export const apiBe = axios.create({
  baseURL: `${BE_URL}/api`,
  timeout: 3_000,
  withCredentials: true,
});

apiBe.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  },
);
