import styles from './index.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: Props) => (
  <button className={styles.button} onClick={onClick}>
    <p>{text}</p>
  </button>
);

export default Button;
