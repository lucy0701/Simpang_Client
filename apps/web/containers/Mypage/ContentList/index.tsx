'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { GetPageData, PageParams } from '@/types';

import styles from './index.module.scss';
import { Loading } from '@/components/Loading';
import PageNavigator from '@/components/PageNavigator';

type ContentListProps<T> = {
  queryKey: string[];
  queryFn: (params: PageParams) => Promise<GetPageData<T>>;
  itemComponent: React.ComponentType<T>;
  contentIdKey: string;
  size?: number;
};

const ContentList = <T,>({
  queryKey,
  queryFn,
  itemComponent: ItemComponent,
  contentIdKey,
  size,
}: ContentListProps<T>) => {
  const [page, setPage] = useState(1);

  const { data, error, status } = useQuery({
    queryKey: [...queryKey, page, size],
    queryFn: () => queryFn({ page, size: size || 5, sort: 'desc' }),
    placeholderData: keepPreviousData,
  });

  const dataList = data?.data;
  const totalPages = data?.totalPage || 0;

  const handlePage = (pageNum: number) => setPage(pageNum);

  return status === 'pending' ? (
    <Loading />
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.wrap}>
      {dataList && dataList.length > 0 ? (
        dataList.map((item: any) => (
          <div key={item._id}>
            <ItemComponent {...item} _id={item[contentIdKey]} />
          </div>
        ))
      ) : (
        <div className={styles.nonContent}>
          <p>아직 결과가 없어요 🥲</p>
        </div>
      )}
      <PageNavigator page={page} totalPages={totalPages} setPage={handlePage} />
    </div>
  );
};

export default ContentList;
