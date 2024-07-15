import { BE_URL } from '@/constants';
import { IContent } from '@/types';

import ContentContainer from '@/containers/ContentContainers';

async function getData(id: string): Promise<IContent> {
  const res = await fetch(`${BE_URL}/api/v1/contents/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const contentData = await getData(params.id);
  return <ContentContainer contentData={contentData} />;
}
