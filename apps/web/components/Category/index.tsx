import Image from 'next/image';

import { SIMPANG_ALT } from '@/constants';

import styles from './index.module.scss';

interface Props {
  currentCategory?: string;
  category: string;
  onClick: () => void;
}

const Category = ({ currentCategory, onClick, category }: Props) => (
  <button className={styles.categoryBtn} onClick={() => onClick()}>
    {category === currentCategory ? (
      <Image src="/images/folder_open.png" width={70} height={70} alt={SIMPANG_ALT} />
    ) : (
      <Image src="/images/folder.png" width={70} height={70} alt={SIMPANG_ALT} />
    )}
    {category}
  </button>
);

export default Category;
