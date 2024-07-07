export type ContentType = 'MBTI';

export interface IContent {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  questions: IQuestion[];
  playCount: number;
  commentCount: number;
  likeCount: number;
  type: ContentType;
  creator: string;
}

export interface IContents {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  playCount: number;
  commentCount: number;
  likeCount: number;
  type: ContentType;
}

export interface IQuestion {
  index: number;
  question: string;
  answers: {
    score: number;
    text: string;
  }[];
}

export interface IResult {
  _id: string;
  contentId: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface IUserResult {
  _id: string;
  contentId: string;
  results: {
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
  };
  createdAt: string;
}
