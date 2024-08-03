import { MetadataRoute } from 'next';

import { BE_URL } from '@/constants';
import { getHeaders } from '@/services';
import { GetPageData, IContent } from '@/types';

export const getContents = async () => {
  const headers = getHeaders();
  try {
    const res = await fetch(`${BE_URL}/api/v1/contents?size=20&sort=asc&page=1`, { headers });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json() as Promise<GetPageData<IContent>>;
  } catch (error) {
    throw new Error('Network response was not ok');
  }
};

export const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const contents = await getContents();

  const simpangContents = contents.data.map((content) => ({
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
    {
      url: 'https://simpang.kr/notices',
      lastModified: new Date(),
    },
    ...simpangContents,
  ];
};
export default Sitemap;
