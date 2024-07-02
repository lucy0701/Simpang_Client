import { Contents, GetPageData, PageParams } from '@/types';
import { apiBe } from '.';

export const getContents = (params: PageParams) =>
  apiBe<GetPageData<Contents>>(`/v1/contents`, { params });
