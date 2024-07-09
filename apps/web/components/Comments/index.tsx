'use client';

import { useState } from 'react';
import CommentList from './CommentList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCommentAPI } from '@/services/comment';
import styles from './index.module.scss';
import { decodeToken_csr } from '@/utils';
import WindowStyle from '../WindowStyles';

import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/constants';

interface Props {
  contentId: string;
}

const Comments = ({ contentId }: Props) => {
  const [text, setText] = useState('');
  const [commentCount, setCommentCount] = useState<number>(0);

  const queryClient = useQueryClient();
  const user = decodeToken_csr();
  const router = useRouter();

  const { mutate: postComment } = useMutation({
    mutationFn: postCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadMoreData', contentId] });
      setText('');
    },
  });

  const handlePostComment = () => {
    postComment({ id: contentId, text });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) handlePostComment();
  };

  const updateCommentCount = (num: number) => setCommentCount(num);
  const loginButton = () => router.push(PATHS.LOGIN);

  return (
    <WindowStyle title="댓글" content={commentCount} color="blue">
      <div className={styles.wrap}>
        <div className={styles.inputWrap}>
          {user ? (
            <>
              <input
                value={text}
                onKeyDown={onKeyDown}
                className={styles.commentInput}
                onChange={(e) => setText(e.target.value)}
                maxLength={100}
              />
              <p className={styles.textCount}> {text.length} / 100</p>
              <button className={styles.submitBtn} onClick={() => handlePostComment()}>
                저장
              </button>
            </>
          ) : (
            <button className={cx(styles.nonLogin, 'yellow')} onClick={loginButton}>
              로그인하고 댓글 작성하기!
            </button>
          )}
        </div>
        <CommentList contentId={contentId} user={user} updateCommentCount={updateCommentCount} />
      </div>
    </WindowStyle>
  );
};

export default Comments;
