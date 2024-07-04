import Image from 'next/image';

import styles from './index.module.scss';

import { PATHS, SIMPANG_ALT } from '@/constants';
import { IContents } from '@/types';
import Link from 'next/link';

const ImageLinkItem = ({
  _id,
  imageUrl,
  title,
  content,
  playCount,
  commentCount,
  likeCount,
}: Partial<IContents>) => (
  <Link href={`${PATHS.CONTENTS.BASE}/${_id}`} className={styles.wrap}>
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
  </Link>
);

export default ImageLinkItem;
