import { GetPageData, PageParams } from '@/types';

import { apiBe, getHeaders } from '.';

import { ILikeContent } from '@/types/like';

interface LikeData {
  liked: boolean;
  likeCount: number;
}

export const getLikeAPI = (contentId: string) => {
  const headers = getHeaders();
  return apiBe<LikeData>(`/v1/likes/${contentId}`, { headers });
};

export const postLikeAPI = async (contentId: string) => {
  const headers = getHeaders();
  const res = await apiBe.post<LikeData>(`/v1/likes/${contentId}`, {}, { headers });
  return res.data;
};

export const getLikeContentsAPI = async (params: PageParams) => {
  const headers = getHeaders();
  const res = await apiBe<GetPageData<ILikeContent>>(`/v1/likes`, { params, headers });
  return res.data;
};
