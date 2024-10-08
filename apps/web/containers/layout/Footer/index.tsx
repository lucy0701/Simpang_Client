import Link from 'next/link';

import { EXTERNAL_Link, PATHS } from '@/constants';

import styles from './index.module.scss';

export default function Footer() {
  return (
    <footer className={styles.wrap}>
      <div className={styles.contentsBox}>
        <div className={styles.iconBox}>
          <Link href={EXTERNAL_Link.GITHUB} target="_blank" prefetch={false}>
            <div className={styles.gitHubIcon} />
          </Link>
          <Link href={EXTERNAL_Link.INSTAGRAM} target="_blank" prefetch={false}>
            <div className={styles.instagramIcon} />
          </Link>
          <Link href={EXTERNAL_Link.KAKAOTALK} target="_blank" prefetch={false}>
            <div className={styles.talkIcon} />
          </Link>
        </div>
        <div className={styles.docsBox}>
          <Link href={PATHS.LEGAL.TERMS} target="_blank" prefetch={false}>
            <p>이용약관</p>
          </Link>
          <span>|</span>
          <Link href={PATHS.LEGAL.POLICY} target="_blank" prefetch={false}>
            <p>개인정보처리방침</p>
          </Link>
        </div>
      </div>
      <p>© 2024 Simpang. All rights reserved</p>
    </footer>
  );
}
