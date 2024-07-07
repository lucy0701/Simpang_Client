import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

export type FloatButtonPosition = 'right' | 'left';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  skin?: 'base' | 'float';
  size?: 'small' | 'medium' | 'large';
  color?: 'pink' | 'yellow' | 'blue';
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
      styles[color],
      styles.buttonWrap,
    )}
    onClick={onClick}
    {...rest}
  >
    <p>{text}</p>
  </button>
);

export default Button;
