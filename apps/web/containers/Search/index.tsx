'use client';

import cx from 'classnames';
import { useCallback, useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import { Tag } from '@/types';

import styles from './index.module.scss';

interface Props {
  tags: Tag[];
}

const Search = ({ tags }: Props) => {
  const [text, setText] = useState('');
  const onClickClearBtn = () => setText('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [tagData, setTagData] = useState<Tag[]>(tags);

  const debouncedPostSearch = useDebounce((searchText) => {
    console.log(searchText);
  }, 1000);

  const handleChange = useCallback(
    (text: string) => {
      if (!isEnterPressed) {
        setText(text);
        debouncedPostSearch(text);
      }
      setIsEnterPressed(false);
    },
    [debouncedPostSearch],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      setIsEnterPressed(true);
      console.log(text);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.serachWrap}>
        <div className={styles.inputWrap}>
          <input
            value={text}
            onKeyDown={onKeyDown}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button onClick={onClickClearBtn} className={cx(styles.clearBtn)}>
            X
          </button>
        </div>
        <button className={styles.searchBtn}>
          <div className={styles.searchIcon} />
        </button>
      </div>
      <ul className={styles.serachList}>
        <li>
          <p>123</p>
        </li>
      </ul>
    </div>
  );
};

export default Search;
