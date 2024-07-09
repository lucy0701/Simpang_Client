import Link from 'next/link';

import styles from './index.module.scss';
import Image from 'next/image';
import { EXTERNAL_Link } from '@/constants';
import WindowStyle from '@/components/WindowStyles';

export default function DevInfo() {
  return (
    <main className={styles.wrap}>
      <WindowStyle>
        <div className={styles.contentWrap}>
          <Image
            className={styles.logoIcon}
            src="/images/my_char.png"
            alt="logo"
            width={130}
            height={130}
          />

          <div className={styles.iconBox}>
            <Link href={EXTERNAL_Link.GITHUB} target="_blank" prefetch={false}>
              <div className={styles.gitHubIcon} />
            </Link>
            <Link href={EXTERNAL_Link.INSTAGRAM} target="_blank" prefetch={false}>
              <div className={styles.instagramIcon} />
            </Link>
          </div>

          <p>© 2024 Simpang. All rights reserved</p>
        </div>
      </WindowStyle>
    </main>
  );
}
