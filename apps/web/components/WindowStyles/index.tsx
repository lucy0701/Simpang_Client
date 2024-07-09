import cx from 'classnames';

import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
  content?: string | number;
  color?: 'pink' | 'yellow' | 'blue' | 'green';
}

const WindowStyle = ({ children, title, content, color = 'pink' }: Props) => (
    <div className={styles.wrap}>
      <div className={cx(styles.titleBar, color)}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <div className={styles.barBtn}>
          <span>_</span>
          <span>ㅁ</span>
          <span>⛌</span>
        </div>
      </div>
      <div className={styles.clientArea}>{children}</div>
    </div>
  );
export default WindowStyle;
