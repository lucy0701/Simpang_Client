'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useState } from 'react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getContentsAPI } from '@/services/contents';
import { IContent, Sort } from '@/types';

import styles from './index.module.scss';
import { FloatBtnBox } from '@/components/ButtonBox/FloatBtnBox';
import Button from '@/components/Buttons/Button';
import BannerItem from '@/components/Items/BannerItem';
import ContentItem from '@/components/Items/ContentItem';
import { Loading, RoundLoading } from '@/components/Loading';
import WindowStyle from '@/components/WindowStyles';

interface Props {
  latestContents: IContent[];
}

export default function Home({ latestContents }: Props) {
  const [sort, setSort] = useState<Sort>('desc');

  const {
    dataList: contents,
    lastElementRef,
    status,
    error,
    isFetching,
  } = useInfiniteScroll<IContent>({
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
        <p>Today&apos;s Pick ❤️</p>
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

      <div className={styles.contents}>
        <WindowStyle color="green">
          <div className={styles.btnBox}>
            <Button size="medium" text="등록순" color="yellow" onClick={() => handleSort('asc')} />
            <Button size="medium" text="최신순" color="yellow" onClick={() => handleSort('desc')} />
          </div>
        </WindowStyle>

        {contents &&
          contents.map((content) => (
            <div key={content._id} className={styles.clientArea} ref={lastElementRef}>
              <ContentItem key={content._id} {...content} />
            </div>
          ))}
        {isFetching && <RoundLoading />}
      </div>

      <FloatBtnBox />
    </div>
  );
}
