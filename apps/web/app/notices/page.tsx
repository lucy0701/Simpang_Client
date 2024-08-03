import { Metadata } from 'next';

import { METADATA } from '@/constants';

import Notices from '@/containers/Notices';

export const metadata: Metadata = {
  title: '공지 사항' + 'ㅤ|ㅤ' + METADATA.title,
  description: '심팡 공지 게시판',
};

export default function Page() {
  return <Notices />;
}
