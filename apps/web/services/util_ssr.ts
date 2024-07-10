import { cookies } from 'next/headers';

import { TOKEN_NAME } from '@/constants';

export const getHeaders_ssr = (): { authorization: string } | undefined => {
  const token = cookies().get(TOKEN_NAME);

  if (token) {
    return {
      authorization: token.toString(),
    };
  }

  return undefined;
};
