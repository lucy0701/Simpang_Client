export type NoticeType = 'update' | 'notice' | '';

export interface INotice {
  _id?: string;
  title: string;
  type: NoticeType;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}
