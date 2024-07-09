import cx from 'classnames';
import Image from 'next/image';

import { SIMPANG_ALT } from '@/constants';

import styles from './index.module.scss';


interface Props {
  size: number;
  onClick: () => void;
  text: string | number;
  state?: boolean;
  iconSrc: string;
  altText: string;
  isFullIcon?: boolean;
}

const IconButton = ({ size, onClick, text, state, iconSrc, altText, isFullIcon }: Props) => (
  <div className={styles.buttonWrap}>
    <button onClick={onClick}>
      <Image
        alt={SIMPANG_ALT + altText}
        src={iconSrc}
        className={isFullIcon ? '' : cx(state ? styles.isOn : styles.isOff, styles.btnImage)}
        width={size}
        height={size}
      />
    </button>
    <p>{text}</p>
  </div>
);

export default IconButton;
