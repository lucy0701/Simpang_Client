'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getUserResultsAPI } from '@/services/contents';

import styles from './index.module.scss';
import ResultItem from '@/components/Items/ResultItem';
import { Loading } from '@/components/Loading';
import PageNavigator from '@/components/PageNavigator';

const ResultList = () => {
  const [page, setPage] = useState(1);

  const {
    data: results,
    error,
    status,
  } = useQuery({
    queryKey: ['userResult', page],
    queryFn: () => getUserResultsAPI({ page, size: 5, sort: 'desc' }),
    placeholderData: keepPreviousData,
  });

  const dataList = results?.data;
  const totalPages = results?.totalPage || 0;

  const handlePage = (pageNum: number) => setPage(pageNum);

  return status === 'pending' ? (
    <Loading />
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.resultWrap}>
      {dataList && dataList.length > 0 ? (
        dataList.map((data) => (
          <div key={data._id} className={styles.result}>
            <ResultItem {...data} />
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

export default ResultList;
