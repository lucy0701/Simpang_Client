import { UserInfo } from '@/types';

import { apiBe } from '.';
import { getHeaders } from './util';

export const getUserAPI = () => {
  const headers = getHeaders();
  return apiBe<UserInfo>(`v1/user`, { headers }).then((res) => res.data);
};
