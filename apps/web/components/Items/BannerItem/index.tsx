import Image from 'next/image';
import Link from 'next/link';

import { PATHS, SIMPANG_ALT } from '@/constants';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';

interface Props {
  id: string;
  imageUrl: string;
  title: string;
  btnText?: string;
}

const BannerItem = ({ id, imageUrl, title, btnText = '시작 하기' }: Props) => (
  <>
    <Link href={`${PATHS.CONTENTS.BASE}/${id}`} className={styles.wrap}>
      <div className={styles.imgWrap}>
        <Image
          src={imageUrl}
          priority
          alt={SIMPANG_ALT}
          fill
          sizes="100%"
          className={styles.image}
        />
        <div className={styles.titleWrap}>
          <h3>{title}</h3>
          <Button size="small" text={btnText} />
        </div>
      </div>
    </Link>
  </>
);

export default BannerItem;
