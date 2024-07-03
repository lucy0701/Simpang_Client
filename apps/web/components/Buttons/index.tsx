import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  skin?: 'base' | 'float';
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  text,
  onClick,
  type = 'button',
  skin = 'base',
  size = 'large',
  ...rest
}: Props) => (
  <button
    type={type || 'button'}
    className={cx(styles[skin], skin === 'base' && styles[size!], styles.buttonWrap)}
    onClick={onClick}
    {...rest}
  >
    <p>{text}</p>
  </button>
);

export default Button;
