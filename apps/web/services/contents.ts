import { IContent, GetPageData, PageParams, IResult, IUserResult } from '@/types';

import { apiBe, getHeaders } from '.';

export interface PostResultParams {
  contentId: string;
  scores: number[];
}

export const getContentsAPI = (params: PageParams) =>
  apiBe<GetPageData<IContent>>(`/v1/contents`, { params });

export const getResultAPI = (resultId: string) => apiBe<IResult>(`/v1/results/${resultId}`);

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

export const getRandomContentAPI = async ({ size }: { size: number }) => {
  const res = await apiBe<IContent[]>(`/v1/contents/random?size=${size}`);
  return res.data;
};
