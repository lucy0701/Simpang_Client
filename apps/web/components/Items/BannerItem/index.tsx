import Image from 'next/image';
import Link from 'next/link';

import { PATHS, SIMPANG_ALT } from '@/constants';

import styles from './index.module.scss';

interface Props {
  id: string;
  imageUrl: string;
  title: string;
}

const BannerItem = ({ id, imageUrl, title }: Props) => (
  <>
    <Link href={`${PATHS.CONTENTS.BASE}/${id}`} className={styles.wrap}>
      <div className={styles.imgWrap}>
        <Image
          src={imageUrl}
          priority
          alt={SIMPANG_ALT}
          fill
          sizes="100%"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          className={styles.image}
        />
        <div className={styles.titleWrap}>
          <h3>{title}</h3>
        </div>
      </div>
    </Link>
  </>
);

export default BannerItem;
