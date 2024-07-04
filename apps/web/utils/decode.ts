import { jwtDecode } from 'jwt-decode';
import { getCookie } from './cookies';
import { DecodedToken, Token, UserToken } from '@/types';
import { TOKEN_NAME } from '@/constants';

export const decodeToken = (token: string) => {
  try {
    const decodedToken: Token = jwtDecode(token);

    return {
      id: decodedToken.sub,
      role: decodedToken.role,
      exp: decodedToken.exp,
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const decodeToken_csr = (): UserToken => {
  const token = getCookie(TOKEN_NAME);

  if (!token) return null;

  const decodedToken: DecodedToken = decodeToken(token);

  if (!decodedToken) return null;

  return {
    id: decodedToken.id,
    role: decodedToken.role,
  };
};
