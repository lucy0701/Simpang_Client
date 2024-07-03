import { BE_URL } from '@/constants';
import ContentContainer from '@/containers/ContentContainers';
import { Content } from '@/types';

export default async function Page({ params }: { params: { contentId: string } }) {
  const contentData = await fetch(`${BE_URL}/api/v1/contents/${params.contentId}`).then(
    (res) => res.json() as Promise<Content>,
  );
  return <ContentContainer contentData={contentData} />;
}
