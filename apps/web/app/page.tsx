import { BE_URL } from '@/constants';
import Home from '@/containers/Home';
import { IContents, GetPageData } from '@/types';

export default async function Page() {
  const latestContents = await fetch(`${BE_URL}/api/v1/contents/?size=6&sort=desc&page=1`).then(
    (res) => res.json() as Promise<GetPageData<IContents>>,
  );
  return <Home latestContents={latestContents.data} />;
}
