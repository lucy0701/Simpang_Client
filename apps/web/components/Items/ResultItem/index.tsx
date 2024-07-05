import Image from 'next/image';

import styles from './index.module.scss';

import { PATHS, SIMPANG_ALT } from '@/constants';
import { IUserResult } from '@/types';
import Link from 'next/link';
import { dateSplit } from '@/utils/dateTime';

const ResultItem = ({ results, createdAt }: IUserResult) => (
  <Link href={`${PATHS.RESULTS}/${results._id}`} className={styles.wrap}>
    <div className={styles.imgWrap}>
      <Image
        src={results!.imageUrl!}
        priority
        alt={SIMPANG_ALT}
        fill
        sizes="100%"
        className={styles.image}
      />
    </div>

    <div className={styles.contentBox}>
      <h3 className={styles.title}>{results.title}</h3>
      <p className={styles.content}>{results.content}</p>
      <p className={styles.date}>{dateSplit(createdAt)}</p>
    </div>
  </Link>
);

export default ResultItem;
