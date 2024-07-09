import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';


import Button from '@/components/Buttons/Button';
import { RoundLoading } from '@/components/Loading';
import { getCommentAPI } from '@/services/comment';
import { PageParams, IComment, DecodedToken } from '@/types';

import styles from './index.module.scss';
import CommentItem from '../CommentItem';

interface Props {
  contentId: string;
  user: DecodedToken;
  updateCommentCount: (num: number) => void;
}

const CommentList = ({ contentId, user, updateCommentCount }: Props) => {
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
    queryKey: ['loadMoreComment', contentId],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.totalPage > lastPage.currentPage ? lastPage.currentPage + 1 : undefined,
  });

  const dataList = useMemo(
    () => comments?.pages.reduce((acc: IComment[], page) => [...acc, ...page.data], []),
    [comments],
  );

  useEffect(() => {
    if (comments?.pages[0]?.totalCount !== undefined) {
      updateCommentCount(comments.pages[0].totalCount);
    }
  }, [comments, updateCommentCount]);

  return status === 'pending' ? (
    <RoundLoading />
  ) : status === 'error' ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div className={styles.wrap}>
      <div className={styles.commentWrap}>
        {dataList?.map((comment, i) => (
          <CommentItem key={i} contentId={contentId} comment={comment} user={user} />
        ))}
      </div>
      {isFetching && <RoundLoading />}
      {hasNextPage && (
        <Button text="More" color="yellow" size="small" onClick={() => fetchNextPage()} />
      )}
    </div>
  );
};

export default CommentList;
