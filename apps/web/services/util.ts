import { TOKEN_NAME } from '@/constants';
import { getCookie } from '@/utils';

export const getHeaders = (): { authorization: string } | undefined => {
  const token = getCookie(TOKEN_NAME);

  if (token) {
    return {
      authorization: token,
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
