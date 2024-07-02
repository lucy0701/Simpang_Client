import Image from 'next/image';

import styles from './index.module.scss';

import { SIMPANG_ALT } from '@/constants';
import { Contents } from '@/types';

const ImageItem = ({
  imageUrl,
  title,
  content,
  playCount,
  commentCount,
  likeCount,
}: Partial<Contents>) => (
  <div className={styles.wrap}>
    <div className={styles.imgWrap}>
      <Image src={imageUrl!} alt={SIMPANG_ALT} fill sizes="100%" className={styles.image} />
      {title && <h3 className={styles.title}>{title}</h3>}
    </div>

    <div className={styles.contentBox}>
      {content && <p className={styles.content}>{content}</p>}

      <div className={styles.countBox}>
        {likeCount !== undefined && (
          <div className={styles.counts}>
            <div className={styles.likeIcon} />
            <span>{likeCount}</span>
          </div>
        )}
        {playCount !== undefined && (
          <div className={styles.counts}>
            <div className={styles.playIcon} />
            <span>{playCount}</span>
          </div>
        )}
        {commentCount !== undefined && (
          <div className={styles.counts}>
            <div className={styles.commentIcon} />
            <span>{commentCount}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ImageItem;
