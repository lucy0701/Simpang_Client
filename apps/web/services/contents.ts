import { PageParams } from '@/types';
import { apiBe } from '.';

export const getContents = (params: PageParams) => apiBe(`/v1/contents`, { params });