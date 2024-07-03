import { Contents, GetPageData, PageParams, Result } from '@/types';
import { apiBe, getHeaders } from '.';

export interface PostResultParams {
  contentId: string;
  scores: number[];
}

export const getContentsAPI = (params: PageParams) =>
  apiBe<GetPageData<Contents>>(`/v1/contents`, { params });

export const postResultAPI = async ({ contentId, scores }: PostResultParams): Promise<Result> => {
  const headers = getHeaders();
  const res = await apiBe.post<Result>(`/v1/results/${contentId}`, { score: scores }, { headers });
  return res.data;
};

export const getResultAPI = async (resultId: string) => apiBe<Result>(`/v1/results/${resultId}`);

export const getUserResultAPI = async (params: PageParams) => {
  const headers = getHeaders();
  const res = await apiBe(`/v1/results`, { params, headers });
  return res;
};
