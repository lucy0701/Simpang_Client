import { BE_URL } from '@/constants';
import { Tag } from '@/types';

import Search from '@/containers/Search';

export default async function Page() {
  const tags = await fetch(`${BE_URL}/api/v1/tags?filter=`).then(
    (res) => res.json() as Promise<Tag[]>,
  );
  return <Search tags={tags} />;
}
