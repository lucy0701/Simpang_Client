import { AxiosResponse } from 'axios';

export * from './login';
export * from './content';

export type Sort = 'asc' | 'desc';

export interface PageParams {
  page: number;
  size: number;
  sort?: Sort;
}

export interface GetPageData<T> {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  data: T[];
}

export interface IComment {
  _id: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationOptions<T> {
  getData: (params: PageParams) => Promise<AxiosResponse<GetPageData<T>>>;
  sort: Sort;
  size: number;
}
