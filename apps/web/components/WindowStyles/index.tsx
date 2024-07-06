import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
}

const WindowStyle = ({ children, title }: Props) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.titleBar}>
        <h3>{title}</h3>
        <div className={styles.barBtn}>
          <span>_</span>
          <span>ㅁ</span>
          <span>x</span>
        </div>
      </div>
      <div className={styles.clientArea}>{children}</div>
    </div>
  );
};
export default WindowStyle;
