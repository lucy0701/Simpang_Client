import { Metadata, ResolvingMetadata } from 'next';

import { BE_URL, METADATA } from '@/constants';
import { IContent } from '@/types';

import ContentContainer from '@/containers/ContentContainers';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const contentData = await getData(params.id);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: contentData.title + 'ㅤ|ㅤ' + METADATA.title,
    description: contentData.content,
    openGraph: {
      images: [contentData.imageUrl, ...previousImages],
    },
  };
}

async function getData(id: string): Promise<IContent> {
  const res = await fetch(`${BE_URL}/api/v1/contents/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page({ params }: Props) {
  const contentData = await getData(params.id);
  return <ContentContainer contentData={contentData} />;
}
