import { PaginationOptions } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useRef } from 'react';

const useInfiniteScroll = <T>({ getData, sort, size }: PaginationOptions<T>) => {
  const observer = useRef<IntersectionObserver>();

  const fetchData = async ({ pageParam = 1 }) => {
    const res = await getData({ page: pageParam, size, sort });
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, status } = useInfiniteQuery({
    queryKey: ['infiniteScrollData', sort],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.totalPage > lastPage.currentPage ? lastPage.currentPage + 1 : undefined;
    },
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

  const dataList = useMemo(() => {
    return data?.pages.reduce((acc: T[], page) => {
      return [...acc, ...page.data];
    }, []);
  }, [data]);

  return {
    dataList,
    lastElementRef,
    status,
    error,
    isFetching,
  };
};

export default useInfiniteScroll;
