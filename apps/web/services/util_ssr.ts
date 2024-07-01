import { TOKEN_NAME } from '@/constants';
import { cookies } from 'next/headers';

export const getHeaders_ssr = (): { authorization: string } | undefined => {
  const token = cookies().get(TOKEN_NAME);

  if (token) {
    return {
      authorization: token.toString(),
    };
  }

  return undefined;
};
