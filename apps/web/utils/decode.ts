import { jwtDecode } from 'jwt-decode';

import { TOKEN_NAME } from '@/constants';
import { DecodedToken, Token } from '@/types';

import { getCookie, removeCookie } from './cookies';

export const decodeToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token);
    const { sub, ...userToken } = decodedToken;

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      removeCookie(TOKEN_NAME, { path: '/' });
      return null;
    }

    return {
      id: sub,
      ...userToken,
    };
  } catch (error) {
    return null;
  }
};

export const decodeToken_csr = (): DecodedToken => {
  const token = getCookie(TOKEN_NAME);

  if (!token) return null;

  const decodedToken: DecodedToken = decodeToken(token);

  if (!decodedToken) return null;

  return {
    ...decodedToken,
  };
};
