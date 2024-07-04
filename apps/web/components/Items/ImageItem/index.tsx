import Image from 'next/image';

import styles from './index.module.scss';
import cx from 'classnames';

import { SIMPANG_ALT } from '@/constants';

interface Props {
  imageUrl: string;
  shape?: 'circle' | 'square';
  skin?: 'preview' | 'thumbnail' | 'reuslt';
}

const ImageItem = ({ imageUrl, shape = 'square', skin = 'preview' }: Props) => (
  <div className={cx(styles[shape], styles[skin])}>
    <div className={styles.imgWrap}>
      <Image src={imageUrl!} alt={SIMPANG_ALT} fill sizes="100%" className={styles.image} />
    </div>
  </div>
);

export default ImageItem;
