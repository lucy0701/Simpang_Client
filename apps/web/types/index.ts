import { AxiosResponse } from 'axios';

export * from './login';
export * from './content';
export * from './notice';
export * from './like';

export type Sort = 'asc' | 'desc';
export type FloatButtonPosition = 'right' | 'left';

export interface PageParams {
  page: number;
  size: number;
  sort?: Sort;
  filter?: object;
}

export interface GetPageData<T> {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  data: T[];
}

export interface IComment {
  _id: string;
  user: {
    _id: string;
    name: string;
    thumbnail: string;
  };
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationOptions<T> {
  getData: (params: PageParams) => Promise<AxiosResponse<GetPageData<T>>>;
  sort: Sort;
  size: number;
  filter?: object;
  queryKey: string;
}

export interface ShareKakaoProps {
  contentId?: string;
  resultId?: string;
  title: string;
  description: string;
  imageUrl: string;
  likeCount?: number;
  commentCount?: number;
}
