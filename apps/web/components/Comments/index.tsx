'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PATHS } from '@/constants';
import { postCommentAPI } from '@/services/comment';
import { DecodedToken } from '@/types';
import { decodeToken_csr } from '@/utils';

import CommentList from './CommentList';
import styles from './index.module.scss';
import WindowStyle from '../WindowStyles';

interface Props {
  contentId: string;
}

const Comments = ({ contentId }: Props) => {
  const [text, setText] = useState('');
  const [commentCount, setCommentCount] = useState<number>(0);
  const [user, setUser] = useState<DecodedToken>();
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate: postComment } = useMutation({
    mutationFn: postCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadMoreComment', contentId] });
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

  useEffect(() => {
    const userToken = decodeToken_csr();
    if (userToken) {
      setUser(userToken);
    }
  }, []);

  return (
    <WindowStyle title="댓글" content={commentCount} color="blue">
      <div className={styles.wrap}>
        <div className={cx(styles.inputWrap, 'back_shadow')}>
          {user && user ? (
            <>
              <input
                value={text}
                onKeyDown={onKeyDown}
                className={cx(styles.commentInput)}
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
        <CommentList contentId={contentId} user={user!} updateCommentCount={updateCommentCount} />
      </div>
    </WindowStyle>
  );
};

export default Comments;
