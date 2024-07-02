import { BE_URL } from '@/constants';
import Home from '@/containers/Home';
import { ContentsData } from '@/types';

export default async function Page() {
  const latestContents = await fetch(`${BE_URL}/api/v1/contents/?size=6&sort=asc&page=1`).then(
    (res) => res.json() as Promise<ContentsData>,
  );
  return <Home latestContents={latestContents.contents} />;
}
