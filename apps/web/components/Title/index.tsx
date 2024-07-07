import styles from './index.module.scss';

interface Props {
  title?: string;
  content?: string;
}

const Titel = ({ title, content }: Props) => (
  <div>
    {title && <h3 className={styles.title}>{title}</h3>}
    {content && <p className={styles.content}>{content}</p>}
  </div>
);

export default Titel;
