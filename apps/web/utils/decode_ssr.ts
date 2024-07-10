import { cookies } from 'next/headers';

import { TOKEN_NAME } from '@/constants';
import { DecodedToken } from '@/types';

import { decodeToken } from './decode';

export const decodeToken_ssr = () => {
  const token = cookies().get(TOKEN_NAME);
  if (!token) return undefined;

  const decodedToken: DecodedToken = decodeToken(token?.value);
  if (!decodedToken) return null;

  return {
    id: decodedToken.id,
    role: decodedToken.role,
  };
};
