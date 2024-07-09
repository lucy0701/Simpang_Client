import cx from 'classnames';
import Image from 'next/image';

import { SIMPANG_ALT } from '@/constants';

import styles from './index.module.scss';

interface Props {
  imageUrl: string;
  shape?: 'circle' | 'square';
  skin?: 'preview' | 'thumbnail' | 'reuslt';
}

const ImageItem = ({ imageUrl, shape = 'square', skin = 'preview' }: Props) => (
  <div className={cx(styles[shape], styles[skin], styles.imgWrap)}>
    <Image src={imageUrl!} alt={SIMPANG_ALT} fill priority sizes="100%" className={styles.image} />
  </div>
);

export default ImageItem;
