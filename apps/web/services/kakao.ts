import { FE_URL, KAKAO_APP_KEY, REST_API_KEY } from '@/constants/env';
import { apiBe } from '.';
import { getHeaders } from './util';
import { TOKEN_NAME, USER_INFO } from '@/constants';
import { removeCookie } from '@/utils';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const setKakaoLogin = () => {
  if (typeof window !== 'undefined' && !window.Kakao?.isInitialized())
    window.Kakao.init(KAKAO_APP_KEY);

  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${FE_URL}/login/kakao&response_type=code`;
};

export const kakaoLogout = async () => {
  const headers = getHeaders();
  const res = await apiBe('/oauth2/kakao/logout', { headers });
  removeCookie(TOKEN_NAME, { path: '/' });
  localStorage.removeItem(USER_INFO);

  return res;
};
