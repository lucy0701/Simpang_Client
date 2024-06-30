import Image from 'next/image';

import styles from './index.module.scss';

import { SIMPANG_ALT } from '@/constants';

interface Props {
  url: string;
  title?: string;
  content?: string;
  playCount?: number;
  commentCount?: number;
  likeConut?: number;
}

const ImageItem = ({
  url,
  title,
  content,
  playCount,
  commentCount,
  likeConut,
}: Props) => (
  <div className={styles.wrap}>
    <div className={styles.imgWrap}>
      <Image
        src={url}
        alt={SIMPANG_ALT}
        fill
        sizes='100%'
        className={styles.image}
      />
      {title && <h3 className={styles.title}>{title}</h3>}
    </div>

    <div className={styles.contentBox}>
      {content && <p className={styles.content}>{content}</p>}

      <div className={styles.countBox}>
        {likeConut !== undefined && (
          <div className={styles.counts}>
            <div className={styles.likeIcon} />
            <span>{likeConut}</span>
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
