import Image from 'next/image';
import Link from 'next/link';

import { PATHS, SIMPANG_ALT } from '@/constants';
import { IContent } from '@/types';

import styles from './index.module.scss';

const ContentItem = ({
  _id,
  imageUrl,
  title,
  playCount,
  commentCount,
  likeCount,
}: Partial<IContent>) => (
  <Link href={`${PATHS.CONTENTS.BASE}/${_id}`} className={styles.wrap}>
    <div className={styles.imgWrap}>
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

    <div className={styles.contentBox}>
      {title && <p className={styles.title}>{title}</p>}

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

export default ContentItem;
