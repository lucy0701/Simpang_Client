import { IContents, GetPageData, PageParams, IResult, IUserResult } from '@/types';

import { apiBe, getHeaders } from '.';

export interface PostResultParams {
  contentId: string;
  scores: number[];
}

interface Props {
  contentId: string;
  type: 'Kakao' | 'Link';
}

export const getContentsAPI = (params: PageParams) =>
  apiBe<GetPageData<IContents>>(`/v1/contents`, { params });

export const getResultAPI = async (resultId: string) => apiBe<IResult>(`/v1/results/${resultId}`);

export const getUserResultsAPI = async (params: PageParams) => {
  const headers = getHeaders();
  const res = await apiBe<GetPageData<IUserResult>>(`/v1/results`, { params, headers });
  return res;
};

export const postResultAPI = async ({ contentId, scores }: PostResultParams): Promise<IResult> => {
  const headers = getHeaders();
  const res = await apiBe.post<IResult>(`/v1/results/${contentId}`, { score: scores }, { headers });
  return res.data;
};

export const postShareAPI = async ({ contentId, type }: Props) => {
  const headers = getHeaders();
  await apiBe.post(`/v1/shares/${contentId}?type=${type}`, {}, { headers });
};
