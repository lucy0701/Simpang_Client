import { BE_URL } from '@/constants';
import Home from '@/containers/Home';
import { IContent } from '@/types';

export default async function Page() {
  const contentData = await fetch(`${BE_URL}/api/v1/contents/random?size=5`).then(
    (res) => res.json() as Promise<IContent[]>,
  );
  return <Home latestContents={contentData} />;
}
