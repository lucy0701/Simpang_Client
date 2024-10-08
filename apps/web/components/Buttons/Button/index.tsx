import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import { FloatButtonPosition } from '@/types';

import styles from './index.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  skin?: 'base' | 'float';
  size?: 'small' | 'medium' | 'large';
  color?: 'pink' | 'yellow' | 'blue' | 'green';
  position?: FloatButtonPosition;
}

const Button = ({
  text,
  onClick,
  type = 'button',
  skin = 'base',
  size = 'large',
  color = 'pink',
  position,
  ...rest
}: Props) => (
  <button
    type={type || 'button'}
    className={cx(
      styles[skin],
      skin === 'base' ? styles[size] : styles[position!],
      color,
      styles.buttonWrap,
      'back_shadow',
    )}
    onClick={onClick}
    {...rest}
  >
    <p>{text}</p>
  </button>
);

export default Button;
