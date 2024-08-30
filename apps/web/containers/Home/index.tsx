'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getContentsAPI } from '@/services/contents';
import { getTagsAPI } from '@/services/tags';
import { IContent, Tag } from '@/types';

import styles from './index.module.scss';
import { FloatBtnBox } from '@/components/ButtonBox/FloatBtnBox';
import Category from '@/components/Category';
import BannerItem from '@/components/Items/BannerItem';
import ContentItem from '@/components/Items/ContentItem';
import { Loading, RoundLoading } from '@/components/Loading';
import WindowStyle from '@/components/WindowStyles';

interface Props {
  latestContents: IContent[];
}

export default function Home({ latestContents }: Props) {
  const [currentCategory, setCurrentCategorys] = useState<Tag>({
    name: '전체보기',
  });

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
    filter: { tags: currentCategory?._id },
    queryKey: 'contents',
  });

  const { data: categorys = [], isLoading } = useQuery({
    queryKey: ['tags', currentCategory],
    queryFn: () => getTagsAPI(),
  });

  const onClickCategoryBtn = (category: Tag) => setCurrentCategorys(category);

  return (
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

      <WindowStyle title="카테고리">
        {isLoading ? (
          <RoundLoading />
        ) : (
          [{ name: '전체보기' }, ...categorys].map((category) => (
            <Category
              key={category.name}
              category={category.name}
              currentCategory={currentCategory?.name}
              onClick={() => onClickCategoryBtn(category)}
            />
          ))
        )}
      </WindowStyle>

      {status === 'pending' ? (
        <Loading />
      ) : status === 'error' ? (
        <p>Error: {error?.message}</p>
      ) : (
        <div className={styles.contents}>
          {contents &&
            contents.map((content) => (
              <div key={content._id} className={styles.clientArea} ref={lastElementRef}>
                <ContentItem key={content._id} {...content} />
              </div>
            ))}
          {isFetching && <RoundLoading />}
        </div>
      )}
      <FloatBtnBox />
    </div>
  );
}
