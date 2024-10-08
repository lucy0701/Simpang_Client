import { TOKEN_NAME } from '@/constants';
import { ShareKakaoProps } from '@/types';
import { removeCookie } from '@/utils';

import { apiBe } from '.';
import { getHeaders } from './util';

import { FE_URL, KAKAO_APP_KEY, REST_API_KEY } from '@/constants/env';

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

export const kakaoLoginAPI = async (code: string) => {
  const res = await apiBe(`/oauth2/kakao/login`, {
    params: { code, url: FE_URL + '/login/kakao' },
  });

  return res;
};

export const kakaoLogoutAPI = async () => {
  const headers = getHeaders();
  const res = await apiBe('/oauth2/kakao/logout', { headers });
  removeCookie(TOKEN_NAME, { path: '/' });

  return res;
};

export const kakaoUnlinkAPI = async () => {
  const headers = getHeaders();
  await apiBe.delete('/oauth2/kakao/unlink', { headers });
  removeCookie(TOKEN_NAME, { path: '/' });
};

export const shareKakaotalk = ({
  contentId,
  title,
  imageUrl,
  description,
  likeCount,
  commentCount,
}: ShareKakaoProps) => {
  if (typeof window !== 'undefined' && !window.Kakao?.isInitialized())
    window.Kakao.init(KAKAO_APP_KEY);

  window.Kakao.Share.sendCustom({
    templateId: 109727,

    templateArgs: {
      title,
      description,
      imageUrl,
      button2: '테스트 하기',
      likeCount,
      commentCount,
      contents: `/contents/${contentId}`,
    },
  });
};

export const shareKakaotalkResult = ({
  contentId,
  resultId,
  title,
  imageUrl,
  description,
}: ShareKakaoProps) => {
  if (typeof window !== 'undefined' && !window.Kakao?.isInitialized())
    window.Kakao.init(KAKAO_APP_KEY);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl,
      link: {
        mobileWebUrl: `${FE_URL}/results/${resultId}`,
        webUrl: `${FE_URL}/results/${resultId}`,
      },
    },
    buttons: [
      {
        title: '테스트 하기',
        link: {
          mobileWebUrl: `${FE_URL}/contents/${contentId}`,
          webUrl: `${FE_URL}/contents/${contentId}`,
        },
      },
      {
        title: '결과 보기',
        link: {
          mobileWebUrl: `${FE_URL}/results/${resultId}`,
          webUrl: `${FE_URL}/results/${resultId}`,
        },
      },
    ],
  });
};
