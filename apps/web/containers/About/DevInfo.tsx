import Image from 'next/image';
import Link from 'next/link';

import { EXTERNAL_Link } from '@/constants';

import styles from './index.module.scss';
import WindowStyle from '@/components/WindowStyles';

export default function DevInfo() {
  return (
    <main className={styles.wrap}>
      <WindowStyle title="KIM HI">
        <div className={styles.contentWrap}>
          <Image
            className={styles.logoIcon}
            src={EXTERNAL_Link.THUMBNAIL}
            alt="logo"
            width={200}
            height={300}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />

          <div className={styles.iconBox}>
            <Link href={EXTERNAL_Link.GITHUB} target="_blank" prefetch={false}>
              <div className={styles.gitHubIcon} />
            </Link>
            <Link href={EXTERNAL_Link.INSTAGRAM} target="_blank" prefetch={false}>
              <div className={styles.instagramIcon} />
            </Link>
          </div>
        </div>
      </WindowStyle>
    </main>
  );
}
