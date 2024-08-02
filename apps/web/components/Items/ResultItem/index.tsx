import Image from 'next/image';
import Link from 'next/link';

import { PATHS, SIMPANG_ALT } from '@/constants';
import { IUserResult } from '@/types';
import { dateSplit } from '@/utils/dateTime';

import styles from './index.module.scss';

const ResultItem = ({ contentTitle, results, createdAt }: IUserResult) => (
  <Link href={`${PATHS.RESULTS}/${results._id}`} className={styles.wrap}>
    <div className={styles.resultItemWrap}>
      <div className={styles.contentBox}>
        <h3 className={styles.title}>{results.title}</h3>
        <p className={styles.content}>{results.content}</p>
      </div>

      <div className={styles.imgWrap}>
        <Image
          src={results!.imageUrl!}
          priority
          alt={SIMPANG_ALT}
          fill
          sizes="100%"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcunhpAQAGQQJflMkmGAAAAABJRU5ErkJggg=="
          className={styles.image}
        />
      </div>
    </div>

    <div className={styles.titleWrap}>
      <h2>{contentTitle}</h2>
      <span className={styles.date}>{dateSplit(createdAt)}</span>
    </div>
  </Link>
);

export default ResultItem;
