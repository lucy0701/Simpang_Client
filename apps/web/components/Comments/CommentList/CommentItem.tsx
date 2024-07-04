import ImageItem from '@/components/Items/ImageItem';
import { deleteCommentAPI, patchCommentAPI } from '@/services/comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';
import { useState } from 'react';
import { getTimeDifference } from '@/utils/dateTime';
import { UserToken, IComment } from '@/types';
import cx from 'classnames';

interface Props {
  contentId: string;
  comment: IComment;
  user: UserToken;
}

const CommentItem = ({ contentId, comment, user }: Props) => {
  const [text, setText] = useState('');
  const [isModifying, setIsModifying] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadMoreData', contentId] });
    },
  });

  const handleDeleteComment = (commentId: string) => {
    deleteComment({ id: commentId });
  };

  const { mutate: patchComment } = useMutation({
    mutationFn: patchCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loadMoreData', contentId] });
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
    <div className={styles.commentBox}>
      <ImageItem skin="thumbnail" shape="circle" imageUrl={comment.user?.thumbnail} />

      <div className={styles.commentTextBox}>
        <div className={styles.topBox}>
          <div className={styles.userWrap}>
            <p className={styles.userName}>{comment.user?.name}</p>
            <p className={styles.createTime}>{getTimeDifference(comment.createdAt)}</p>
            {comment.updatedAt !== comment.createdAt && (
              <p className={styles.createTime}>• 수정 됨</p>
            )}
          </div>

          {(comment.user._id === user?.id || user?.role === 'Admin') && (
            <div className={styles.buttomBox}>
              <button
                onClick={() => (isModifying ? handlePatchComment(comment._id) : onClickModifyBtn())}
              >
                {isModifying ? '저장' : '수정'}
              </button>
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
          <input
            defaultValue={comment.text}
            className={cx(styles.inputText, styles.text)}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <p className={styles.text}>{comment.text}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
