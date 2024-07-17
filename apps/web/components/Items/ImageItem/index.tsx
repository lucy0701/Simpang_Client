import cx from 'classnames';
import Image from 'next/image';

import { SIMPANG_ALT } from '@/constants';

import styles from './index.module.scss';

interface Props {
  imageUrl: string;
  shape?: 'circle' | 'square';
  skin?: 'thumbnail';
}

const ImageItem = ({ imageUrl, shape = 'square', skin }: Props) => (
  <div className={cx(styles[shape], skin && styles[skin], styles.imgWrap)}>
    <Image
      src={imageUrl!}
      alt={SIMPANG_ALT}
      priority
      width={700}
      height={475}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      className={styles.image}
    />
  </div>
);

export default ImageItem;
