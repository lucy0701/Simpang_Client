import { MetadataRoute } from 'next';

import { BE_URL } from '@/constants';
import { getHeaders } from '@/services';
import { IContents } from '@/types';

export const getTests = async (): Promise<IContents[]> => {
  const headers = getHeaders();
  try {
    const res = await fetch(`${BE_URL}/api/v1/contents?size=10&sort=asc&page=1`, { headers });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return (await res.json()) as IContents[];
  } catch (error) {
    return [];
  }
};

export const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const contents: IContents[] = await getTests();

  const simpangContents = contents.map((content) => ({
    url: `https://simpang.kr/contents/${content._id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: 'https://simpang.kr',
      lastModified: new Date(),
    },
    {
      url: 'https://simpang.kr/about/',
      lastModified: new Date(),
    },
    {
      url: 'https://simpang.kr/about/dev',
      lastModified: new Date(),
    },
    ...simpangContents,
  ];
};
export default Sitemap;
