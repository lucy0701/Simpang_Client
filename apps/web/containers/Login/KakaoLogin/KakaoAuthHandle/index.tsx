'use client';

import { AUTHORIZATION, PATHS, TOKEN_NAME, USER_INFO } from '@/constants';
import { apiBe } from '@/services';
import { DecodedToken, UserInfo } from '@/types';
import { decodeToken, setCookie } from '@/utils';
import { getExpirationDate } from '@/utils/dateTime';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoAuthHandle() {
  const code = useSearchParams().get('code');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!code) return null;

        const res = await apiBe(`/oauth2/kakao/login`, {
          params: { code },
        });

        const token = res.headers[AUTHORIZATION];

        const decodedToken: DecodedToken = decodeToken(token);
        const userInfo: UserInfo = res.data;

        if (!decodedToken) return null;

        setCookie(TOKEN_NAME, token, {
          path: '/',
          secure: true,
          expires: getExpirationDate(decodedToken.exp),
        });

        localStorage.setItem(USER_INFO, JSON.stringify(userInfo));

        router.replace(PATHS.HOME);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return <div> Loding... </div>;
}
