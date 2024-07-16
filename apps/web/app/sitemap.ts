import { MetadataRoute } from 'next';

import { BE_URL } from '@/constants';
import { getHeaders } from '@/services';
import { IContents } from '@/types';

export const getTests = (): Promise<IContents[]> => {
  const headers = getHeaders();
  return fetch(`${BE_URL}/api/v1/contents?size=10&sort=asc&page=1`, { headers })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch(() => []);
};

export const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const tests: IContents[] = await getTests();

  const simpangContents = tests.map((test) => ({
    url: `https://simpang.kr/contents/${test._id}`,
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
