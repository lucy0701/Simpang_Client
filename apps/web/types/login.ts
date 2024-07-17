export type Role = 'User' | 'Admin' | 'Creator';

export type Token = {
  sub: string;
  role: Role;
  exp: number;
};

export type DecodedToken =
  | (Omit<Token, 'sub'> & {
      id: string;
    })
  | null;

export type UserInfo = {
  _id: string;
  name: string;
  createdAt: string;
  role: Role;
  thumbnail: string;
};
