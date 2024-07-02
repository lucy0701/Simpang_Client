import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = ({ text, onClick, type = 'button', ...rest }: Props) => (
  <button
    type={type || 'button'}
    className={styles.button}
    onClick={onClick}
    {...rest}>
    <p>{text}</p>
  </button>
);

export default Button;
