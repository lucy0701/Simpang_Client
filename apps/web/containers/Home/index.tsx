'use client';
import { IContents, Sort } from '@/types';
import styles from './index.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
import { SIMPANG_ALT } from '@/constants';
import ImageItem from '@/components/Items/ImageItem';
import { FloatBtnBox } from '@/components/Buttons/FloatBtnBox';

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
            <ImageLinkItem imageUrl={t.imageUrl} _id={t._id} />
          </SwiperSlide>
        ))}
      </Swiper>

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

      <FloatBtnBox />
    </div>
  );
}
