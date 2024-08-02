'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { useState } from 'react';

import { getUserResultsAPI } from '@/services/contents';

import styles from './index.module.scss';
import ResultItem from '@/components/Items/ResultItem';
import { Loading } from '@/components/Loading';

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

  const dataList = results?.data.data;
  const totalPages = results?.data.totalPage || 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

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
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1} className={styles.pageButton}>
          &lt; 이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={page === pageNum ? styles.activePage : ''}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={cx(styles.pageButton, styles.pageMovementButton)}
        >
          다음 &gt;
        </button>
      </div>
    </div>
  );
};

export default ResultList;
