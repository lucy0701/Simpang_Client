export type Role = 'User' | 'Admin' | 'Creator';

export type Token = {
  sub: string;
  role: Role;
  exp: number;
  name: string;
  thumbnail: string;
  createdAt: string;
};

export type DecodedToken =
  | (Omit<Token, 'sub'> & {
      id: string;
    })
  | null;
