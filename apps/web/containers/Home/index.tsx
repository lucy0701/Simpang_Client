'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getContentsAPI } from '@/services/contents';
import { IContent } from '@/types';

import styles from './index.module.scss';
import { FloatBtnBox } from '@/components/ButtonBox/FloatBtnBox';
import BannerItem from '@/components/Items/BannerItem';
import ContentItem from '@/components/Items/ContentItem';
import { Loading, RoundLoading } from '@/components/Loading';

interface Props {
  latestContents: IContent[];
}

export default function Home({ latestContents }: Props) {
  const {
    dataList: contents,
    lastElementRef,
    status,
    error,
    isFetching,
  } = useInfiniteScroll<IContent>({
    getData: getContentsAPI,
    sort: 'desc',
    size: 10,
    queryKey: 'contents',
  });

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
            <BannerItem imageUrl={t.imageUrl} id={t._id} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.contents}>
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
