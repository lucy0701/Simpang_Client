export * from './login';
export * from './content';
export * from './result';

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
