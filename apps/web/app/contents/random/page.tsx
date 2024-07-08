import { BE_URL } from '@/constants';
import ContentContainer from '@/containers/ContentContainers';
import { IContent } from '@/types';

export default async function Page() {
  const contentData = await fetch(`${BE_URL}/api/v1/contents/random?size=1`).then(
    (res) => res.json() as Promise<IContent[]>,
  );
  return <ContentContainer contentData={contentData[0]!} />;
}
