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
  name: string;
  createdAt: string;
  thumbnail: string;
};
