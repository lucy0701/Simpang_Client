'use client';

import ResultItem from '@/components/Items/ResultItem';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getUserResultsAPI } from '@/services/contents';
import { IUserResult } from '@/types';

import styles from './index.module.scss';

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
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.resultWrap}>
      {results &&
        results.map((data) => (
          <div key={data._id} ref={lastElementRef}>
            <ResultItem {...data} />
          </div>
        ))}
      {isFetching && <div>Carregando mais dados...</div>}
    </div>
  );
};

export default ResultList;
