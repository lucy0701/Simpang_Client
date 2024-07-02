export type ContentType = 'MBTI';

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
