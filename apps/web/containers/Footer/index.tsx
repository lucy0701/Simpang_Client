import Link from 'next/link';

import styles from './index.module.scss';

import { EXTERNAL_Link } from '@/constants';

export default function Footer() {
  return (
    <footer className={styles.wrap}>
      <div className={styles.contentsBox}>
        <div className={styles.iconBox}>
          <Link href={EXTERNAL_Link.GITHUB} target='_blank' prefetch={false}>
            <div className={styles.gitHubIcon} />
          </Link>
          <Link href={EXTERNAL_Link.INSTAGRAM} target='_blank' prefetch={false}>
            <div className={styles.instagramIcon} />
          </Link>
          <Link href='/api/rss' target='_blank' prefetch={false}>
            <div className={styles.rssIcon} />
          </Link>
        </div>
        <div className={styles.docsBox}>
          <Link href='/terms' target='_blank' prefetch={false}>
            <p>이용약관</p>
          </Link>
          <span>|</span>
          <Link href='/policy' target='_blank' prefetch={false}>
            <p>개인정보처리방침</p>
          </Link>
        </div>
      </div>
      <p>© 2024 Simpang. All rights reserved </p>
    </footer>
  );
}
