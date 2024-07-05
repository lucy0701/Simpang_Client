import { jwtDecode } from 'jwt-decode';
import { getCookie } from './cookies';
import { DecodedToken, Token } from '@/types';
import { TOKEN_NAME } from '@/constants';

export const decodeToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token);
    const { sub, ...userToken } = decodedToken;

    return {
      id: sub,
      ...userToken,
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
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
