import { apiBe, getHeaders } from '.';

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