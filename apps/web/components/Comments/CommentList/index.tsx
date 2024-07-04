import Button from '@/components/Buttons';
import { getCommentAPI } from '@/services/comment';
import { PageParams, IComment, UserToken } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import styles from './index.module.scss';
import CommentItem from './CommentItem';

interface Props {
  contentId: string;
  user: UserToken;
}

const CommentList = ({ contentId, user }: Props) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const params: PageParams = { page: pageParam, size: 5, sort: 'desc' };
    const res = await getCommentAPI({ id: contentId, params });
    return res.data;
  };

  const {
    data: comments,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ['loadMoreData', contentId],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.totalPage > lastPage.currentPage ? lastPage.currentPage + 1 : undefined;
    },
  });

  const dataList = useMemo(() => {
    return comments?.pages.reduce((acc: IComment[], page) => {
      return [...acc, ...page.data];
    }, []);
  }, [comments]);

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.wrap}>
      <div className={styles.commentWrap}>
        {dataList?.map((comment, i) => (
          <CommentItem key={i} contentId={contentId} comment={comment} user={user} />
        ))}
      </div>
      {isFetching && <p>새로운 데이터를 가져오는 중...</p>}
      {hasNextPage && <Button text="More" size="small" onClick={() => fetchNextPage()} />}
    </div>
  );
};

export default CommentList;
