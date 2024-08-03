import { Metadata } from 'next';

import { BE_URL, METADATA } from '@/constants';
import { INotice } from '@/types';

import Notice from '@/containers/Notices/Notice';

type Props = {
  params: { id: string };
};

async function getData(id: string): Promise<INotice> {
  const res = await fetch(`${BE_URL}/api/v1/notices/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const noticeData = await getData(params.id);

  return {
    title: noticeData.title + 'ㅤ|ㅤ' + METADATA.title,
    description: noticeData.content,
  };
}

export default async function Page({ params }: Props) {
  const NoticeData = await getData(params.id);

  return <Notice {...NoticeData} />;
}
