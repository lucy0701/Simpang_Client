import { useState } from 'react';
import CommentList from './CommentList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCommentAPI } from '@/services/comment';
import styles from './index.module.scss';
import Button from '../Buttons';
import { decodeToken_csr } from '@/utils';

interface Props {
  contentId: string;
}

const Comments = ({ contentId }: Props) => {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const user = decodeToken_csr();

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

  return (
    <div className={styles.wrap}>
      <div className={styles.inputWrap}>
        <input
          value={text}
          onKeyDown={onKeyDown}
          className={styles.commentInput}
          onChange={(e) => setText(e.target.value)}
        />
        <Button size="small" text="저장" onClick={() => handlePostComment()} />
      </div>
      <CommentList contentId={contentId} user={user} />
    </div>
  );
};

export default Comments;
