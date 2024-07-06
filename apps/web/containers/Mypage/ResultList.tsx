'use client';

import ResultItem from '@/components/Items/ResultItem';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getUserResultsAPI } from '@/services/contents';
import { IUserResult } from '@/types';

import styles from './index.module.scss';
import Loading from '@/components/Loading';
import RoundLoading from '@/components/Loading/RoundLoading';

const ResultList = () => {
  const {
    dataList: results,
    lastElementRef,
    status,
    error,
    isFetching,
  } = useInfiniteScroll<IUserResult>({
    getData: getUserResultsAPI,
    sort: 'desc',
    size: 10,
    queryKey: 'userResult',
  });

  return status === 'pending' ? (
    <Loading />
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.resultWrap}>
      {results &&
        results.map((data) => (
          <div key={data._id} className={styles.result} ref={lastElementRef}>
            <ResultItem {...data} />
          </div>
        ))}
      {isFetching && <RoundLoading />}
    </div>
  );
};

export default ResultList;
