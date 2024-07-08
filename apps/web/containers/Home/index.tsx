'use client';
import { IContents, Sort } from '@/types';
import styles from './index.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ContentItem from '@/components/Items/ContentItem';
import WindowStyle from '@/components/WindowStyles';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getContentsAPI } from '@/services/contents';
import { useState } from 'react';
import Loading from '@/components/Loading';
import RoundLoading from '@/components/Loading/RoundLoading';
import Button from '@/components/Buttons';
import { FloatBtnBox } from '@/components/Buttons/FloatBtnBox';
import BannerItem from '@/components/Items/BannerItem';

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
      <div className={styles.speechBubbleWrap}>
        <p>Today's Pick </p>
        <div className={styles.speechBubblePoint} />
      </div>
      <Swiper
        className={styles.bannerWrap}
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        slidesPerGroup={1}
        speed={2000}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {latestContents.map((t, i) => (
          <SwiperSlide key={i} className={styles.slideItem}>
            <BannerItem imageUrl={t.imageUrl} id={t._id} title={t.title} />
          </SwiperSlide>
        ))}
      </Swiper>

      <WindowStyle title="NEW" color="blue">
        <div className={styles.btnBox}>
          <Button size="small" text="등록순" color="yellow" onClick={() => handleSort('asc')} />
          <Button size="small" text="최신순" color="yellow" onClick={() => handleSort('desc')} />
        </div>

        {contents &&
          contents.map((content) => (
            <div key={content._id} className={styles.clientArea} ref={lastElementRef}>
              <ContentItem key={content._id} {...content} />
            </div>
          ))}
      </WindowStyle>
      {isFetching && <RoundLoading />}

      <FloatBtnBox />
    </div>
  );
}
