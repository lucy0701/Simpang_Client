import { BE_URL } from '@/constants';
import { IContent } from '@/types';

import ContentContainer from '@/containers/ContentContainers';

async function getData(): Promise<IContent[]> {
  const res = await fetch(`${BE_URL}/api/v1/contents/random?size=1`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page() {
  const randomData = await getData();
  return <ContentContainer contentData={randomData[0]!} />;
}
