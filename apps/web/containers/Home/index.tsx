'use client';
import { IContents, Sort } from '@/types';
import styles from './index.module.scss';

import ImageLinkItem from '@/components/Items';
import RandomButton from '@/components/Buttons/RandomBtn';
import WindowStyle from '@/components/WindowStyles';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getContentsAPI } from '@/services/contents';
import { useState } from 'react';
import Loading from '@/components/Loading';
import FloatTopBtn from '@/components/Buttons/FloatTopBtn';
import RoundLoading from '@/components/Loading/RoundLoading';
import Button from '@/components/Buttons';

interface Props {
  latestContents: IContents[];
}

export default function Home({ latestContents }: Props) {
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
      <div className={styles.bannerWrap}>슬라이드 배너</div>
      <WindowStyle title="NEW" color="blue">
        <div className={styles.btnBox}>
          <Button size="medium" text="등록순" color="yellow" onClick={() => handleSort('asc')} />
          <Button size="medium" text="최신순" color="yellow" onClick={() => handleSort('desc')} />
        </div>

        {contents &&
          contents.map((content) => (
            <div key={content._id} className={styles.clientArea} ref={lastElementRef}>
              <ImageLinkItem key={content._id} {...content} />
            </div>
          ))}
      </WindowStyle>
      {isFetching && <RoundLoading />}

      <FloatTopBtn position="right" />
      <RandomButton position="left" />
    </div>
  );
}
