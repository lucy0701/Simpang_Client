export type ContentType = 'MBTI';

export interface Content {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  questions: Question[];
  playCount: number;
  commentCount: number;
  likeCount: number;
  type: ContentType;
  creator: string;
}

export interface Contents {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  playCount: number;
  commentCount: number;
  likeCount: number;
  type: ContentType;
}

export interface Question {
  index: number;
  question: string;
  answers: {
    score: number;
    text: string;
  }[];
}

export interface Result {
  _id: string;
  contentId: string;
  title: string;
  content: string;
  imageUrl?: string;
}
