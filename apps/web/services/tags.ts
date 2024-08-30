import { Tag } from '@/types';

import { apiBe, getHeaders } from '.';

export const getTagsAPI = async (filter?: string) => {
  const headers = getHeaders();
  const res = await apiBe<Tag[]>(`/v1/tags?filter=${filter ? filter : ''}`, { headers });
  return res.data;
};

export const postTagsAPI = async (data: string) => {
  const headers = getHeaders();
  const res = await apiBe.post<Tag>(`/v1/tags/`, { data }, { headers });
  return res.data;
};

export const deleteTagsAPI = async (tagId: string) => {
  const headers = getHeaders();
  await apiBe.delete<Tag>(`/v1/tags/${tagId}`, { headers });
};
