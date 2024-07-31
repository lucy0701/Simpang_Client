import { Metadata } from 'next';

import { METADATA } from '@/constants';

import About from '@/containers/About';

export const metadata: Metadata = {
  title: '소개' + 'ㅤ|ㅤ' + METADATA.title,
  description: '심팡 소개 페이지',
};

export default function Page() {
  return <About />;
}
