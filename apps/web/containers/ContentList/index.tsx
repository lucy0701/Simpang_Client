'use client';

import ImageLinkItem from '@/components/Items';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getContentsAPI } from '@/services/contents';
import { IContents, Sort } from '@/types';
import { useState } from 'react';

import styles from './index.module.scss';
import Button from '@/components/Buttons';
import Loading from '@/components/Loading';
import RoundLoading from '@/components/Loading/RoundLoading';
import { FloatTopBtn } from '@/components/Buttons/FloatTopBtn';
import RandomButton from '@/components/Buttons/RandomBtn';

export default function ContentList() {
  const [sort, setSort] = useState<Sort>('desc');

  const {
    dataList: contents,
    lastElementRef,
    status,
    error,
    isFetching,
  } = useInfiniteScroll<IContents>({
    getData: getContentsAPI,
    sort,
    size: 10,
    queryKey: 'contents',
  });

  const handleSort = (sort: Sort) => {
    setSort(sort);
  };

  return status === 'pending' ? (
    <Loading />
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.wrap}>
      <div className={styles.btnBox}>
        <Button size="medium" text="등록순" onClick={() => handleSort('asc')} />
        <Button size="medium" text="최신순" onClick={() => handleSort('desc')} />
      </div>
      
      <FloatTopBtn position="right" />
      <RandomButton position="left" />

      {contents &&
        contents.map((content) => (
          <div key={content._id} ref={lastElementRef}>
            <ImageLinkItem {...content} />
          </div>
        ))}
      {isFetching && <RoundLoading />}
    </div>
  );
}
