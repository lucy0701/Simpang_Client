import { BE_URL } from '@/constants';
import { IContent, Tag } from '@/types';

import Home from '@/containers/Home';

export default async function Page() {
  const contentData = await fetch(`${BE_URL}/api/v1/contents/random?size=5`).then(
    (res) => res.json() as Promise<IContent[]>,
  );
  const categorys = await fetch(`${BE_URL}/api/v1/tags?filter=`).then(
    (res) => res.json() as Promise<Tag[]>,
  );
  return <Home latestContents={contentData} categorys={categorys} />;
}
