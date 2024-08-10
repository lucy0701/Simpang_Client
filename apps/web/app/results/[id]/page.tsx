import { Metadata, ResolvingMetadata } from 'next';

import { BE_URL, METADATA } from '@/constants';
import { IResult } from '@/types';

import ContentResult from '@/containers/ContentResult';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resultData = await getData(params.id);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: resultData.title + 'ㅤ|ㅤ' + METADATA.title,
    description: resultData.content,
    openGraph: {
      images: [resultData.imageUrl!, ...previousImages],
    },
  };
}

async function getData(id: string): Promise<IResult> {
  const res = await fetch(`${BE_URL}/api/v1/results/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const resultData = await getData(params.id);

  return <ContentResult resultData={resultData} />;
}
