'use client';
import ImageItem from '@/components/Items';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getContents } from '@/services/contents';
import { Contents, Sort } from '@/types';
import { useState } from 'react';

import styles from './index.module.scss';
import Button from '@/components/Buttons';

export default function ContentList() {
  const [sort, setSort] = useState<Sort>('asc');

  const {
    dataList: contents,
    lastElementRef,
    status,
    error,
    isFetching,
  } = useInfiniteScroll<Contents>({
    getData: getContents,
    sort,
    size: 10,
  });

  const handleSort = (sort: Sort) => {
    setSort(sort);
  };

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.wrap}>
      <div className={styles.btnBox}>
        <Button size="medium" text="등록순" onClick={() => handleSort('desc')} />
        <Button size="medium" text="최신순" onClick={() => handleSort('asc')} />
      </div>

      {contents &&
        contents.map((content) => (
          <div key={content._id} ref={lastElementRef}>
            <ImageItem {...content} />
          </div>
        ))}
      {isFetching && <div>Carregando mais dados...</div>}
    </div>
  );
}
