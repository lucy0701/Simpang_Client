import { FE_URL, KAKAO_APP_KEY, REST_API_KEY } from '@/constants/env';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function setKakaoLogin() {
  if (typeof window !== 'undefined' && !window.Kakao?.isInitialized())
    window.Kakao.init(KAKAO_APP_KEY);

  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${FE_URL}/login/kakao&response_type=code`;
}
