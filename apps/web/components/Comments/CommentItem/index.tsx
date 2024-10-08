import { useMutation, useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import { useState } from 'react';

import { deleteCommentAPI, patchCommentAPI } from '@/services/comment';
import { DecodedToken, IComment } from '@/types';
import { getTimeDifference } from '@/utils';

import styles from './index.module.scss';
import ImageItem from '@/components/Items/ImageItem';

interface Props {
  contentId: string;
  comment: IComment;
  user: DecodedToken;
}

const CommentItem = ({ contentId, comment, user }: Props) => {
  const [text, setText] = useState('');
  const [isModifying, setIsModifying] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadMoreComment', contentId] });
    },
  });

  const handleDeleteComment = (commentId: string) => {
    deleteComment({ id: commentId });
  };

  const { mutate: patchComment } = useMutation({
    mutationFn: patchCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadMoreComment', contentId] });
      setIsModifying(!isModifying);
      setText('');
    },
  });

  const handlePatchComment = (commentId: string) => {
    patchComment({ id: commentId, text });
  };

  const onClickModifyBtn = () => {
    setIsModifying(!isModifying);
  };

  return (
    <div
      className={cx(styles.commentBox, comment.user._id === user?.id ? styles.blue : styles.yellow)}
    >
      <ImageItem skin="thumbnail" shape="circle" imageUrl={comment.user?.thumbnail} />

      <div className={styles.commentTextBox}>
        <div className={styles.topBox}>
          <div className={styles.userWrap}>
            <p>{comment.user?.name}</p>
            <p className={styles.createTime}>{getTimeDifference(comment.updatedAt)}</p>
            {comment.updatedAt !== comment.createdAt && (
              <p className={styles.createTime}> ⋆ 수정됨</p>
            )}
          </div>

          {(comment.user._id === user?.id || user?.role === 'Admin') && (
            <div className={styles.buttomBox}>
              {comment.user._id === user?.id && (
                <button
                  onClick={() =>
                    isModifying ? handlePatchComment(comment._id) : onClickModifyBtn()
                  }
                >
                  {isModifying ? '저장' : '수정'}
                </button>
              )}
              <button
                onClick={() =>
                  isModifying ? onClickModifyBtn() : handleDeleteComment(comment._id)
                }
              >
                {isModifying ? '취소' : '삭제'}
              </button>
            </div>
          )}
        </div>

        {isModifying ? (
          <div className={styles.inputWrap}>
            <input
              defaultValue={comment.text}
              maxLength={100}
              className={cx(styles.inputText)}
              onChange={(e) => setText(e.target.value)}
            />
            <p className={styles.textCount}> {text.length} / 100</p>
          </div>
        ) : (
          <p className={styles.text}>{comment.text}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
