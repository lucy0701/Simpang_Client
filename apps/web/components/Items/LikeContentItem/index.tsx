import { useMutation, useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { PATHS, SIMPANG_ALT } from '@/constants';
import useDebounce from '@/hooks/useDebounce';
import { postLikeAPI } from '@/services';
import { IContent } from '@/types';

import styles from './index.module.scss';

const LikeContentItem = ({ _id, imageUrl, title }: Partial<IContent>) => {
  const [likeState, setLikeState] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const { mutate: postLike } = useMutation({
    mutationFn: () => postLikeAPI(_id!),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['like'] });
      setLikeState(data.liked);
    },
  });

  const debouncedPostLike = useDebounce(postLike, 500);

  const handlePostLike = () => {
    debouncedPostLike();
  };

  return (
    <div className={styles.wrap}>
      <Link href={`${PATHS.CONTENTS.BASE}/${_id}`} className={styles.linkWrap}>
        <div className={cx(styles.imgWrap, 'back_shadow')}>
          <Image
            src={imageUrl!}
            priority
            alt={SIMPANG_ALT}
            fill
            sizes="100%"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className={styles.image}
          />
        </div>
        <p className={styles.title}>{title}</p>
      </Link>
      <button onClick={handlePostLike}>
        <img
          className={cx(styles.likeIcon, likeState ? styles.iconRed : '')}
          src="/svgs/like_mini.svg"
          alt={SIMPANG_ALT}
        />
      </button>
    </div>
  );
};

export default LikeContentItem;
