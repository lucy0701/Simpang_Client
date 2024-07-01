import { TOKEN_NAME } from '@/constants';
import { getCookie } from '@/utils/cookies';
import { cookies } from 'next/headers';

export const getHeaders = (): { authorization: string } | undefined => {
  const token = getCookie(TOKEN_NAME);

  if (token) {
    return {
      authorization: `Bearer ${token}`,
    };
  }

  return undefined;
};

export const creatHeaders = (contentType: string) => {
  const token = getHeaders();

  if (token) {
    return {
      'Content-Type': contentType,
      Authorization: token.authorization,
    };
  }

  return undefined;
};

export const getHeaders_ssr = (): { authorization: string } | undefined => {
  const token = cookies().get(TOKEN_NAME);

  if (token) {
    return {
      authorization: `Bearer ${token}`,
    };
  }

  return undefined;
};
