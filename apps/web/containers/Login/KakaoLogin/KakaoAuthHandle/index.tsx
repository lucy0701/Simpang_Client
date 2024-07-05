'use client';

import { AUTHORIZATION, PATHS, TOKEN_NAME } from '@/constants';
import { kakaoLoginAPI } from '@/services';
import { DecodedToken } from '@/types';
import { decodeToken, setCookie } from '@/utils';
import { getExpirationDate } from '@/utils/dateTime';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoAuthHandle() {
  const code = useSearchParams().get('code');
  const router = useRouter();

  const {
    mutate: kakaoLogin,
    status,
    error,
  } = useMutation({
    mutationFn: (code: string) => kakaoLoginAPI(code),
    onSuccess: (data) => {
      const token = data.headers[AUTHORIZATION];
      const decodedToken: DecodedToken = decodeToken(token);

      if (!decodedToken) return null;

      setCookie(TOKEN_NAME, token, {
        path: '/',
        secure: true,
        expires: getExpirationDate(decodedToken.exp),
      });

      router.replace(PATHS.HOME);
    },
  });

  useEffect(() => {
    if (code) kakaoLogin(code);
  }, [code, kakaoLogin]);

  return status === 'pending' ? (
    <div>Loading...</div>
  ) : status === 'error' ? (
    <p>Error:{error?.message}</p>
  ) : null;
}
