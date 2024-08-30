import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useRef } from 'react';

import { PaginationOptions } from '@/types';

const useInfiniteScroll = <T>({ getData, sort, size, filter, queryKey }: PaginationOptions<T>) => {
  const observer = useRef<IntersectionObserver>();

  const fetchData = async ({ pageParam = 1 }) => {
    const res = await getData({ page: pageParam, size, sort, filter });
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, status } = useInfiniteQuery({
    queryKey: [queryKey, sort, filter],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.totalPage > lastPage.currentPage ? lastPage.currentPage + 1 : undefined,
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (status === 'pending') return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]!.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, status],
  );

  const dataList = useMemo(
    () => data?.pages.reduce((acc: T[], page) => [...acc, ...page.data], []),
    [data],
  );

  return {
    dataList,
    lastElementRef,
    status,
    error,
    isFetching,
  };
};

export default useInfiniteScroll;
