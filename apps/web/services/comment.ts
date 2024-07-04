import { GetPageData, PageParams, IComment } from '@/types';
import { apiBe } from '.';
import { getHeaders } from './util';

interface PostCommentParams {
  id: string;
  text: string;
}

interface GetCommentParams {
  params: PageParams;
  id: string;
}

export const getCommentAPI = ({ id: contentId, params }: GetCommentParams) =>
  apiBe<GetPageData<IComment>>(`/v1/comments/${contentId}`, { params });

export const postCommentAPI = async ({
  id: contentId,
  text,
}: PostCommentParams): Promise<IComment> => {
  const headers = getHeaders();
  const res = await apiBe.post<IComment>(`/v1/comments/${contentId}`, { text }, { headers });
  return res.data;
};

export const patchCommentAPI = async ({ id: commentId, text }: PostCommentParams) => {
  const headers = getHeaders();
  await apiBe.patch(`/v1/comments/${commentId}`, { text }, { headers });
};

export const deleteCommentAPI = async ({ id: commentId }: { id: string }) => {
  const headers = getHeaders();
  await apiBe.delete(`/v1/comments/${commentId}`, { headers });
};
