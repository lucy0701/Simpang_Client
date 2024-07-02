export type ContentType = 'MBTI';

export interface Question {
  index: number;
  question: string;
  answers: {
    score: number;
    text: string;
  }[];
}

export const CONTENT_TYPE: ContentType[] = ['MBTI'];
