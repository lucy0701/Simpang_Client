import { Metadata } from 'next';

import { METADATA } from '@/constants';

import DevInfo from '@/containers/About/DevInfo';

export const metadata: Metadata = {
  title: '개발자 소개' + 'ㅤ|ㅤ' + METADATA.title,
  description: '심팡 개발자 소개 페이지',
};

export default function Page() {
  return <DevInfo />;
}
