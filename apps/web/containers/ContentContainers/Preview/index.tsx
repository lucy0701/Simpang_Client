'use client';
import { IContent } from '@/types';

import styles from './index.module.scss';
import { IconButtonBox } from '@/components/ButtonBox/IconButtonBox';
import Button from '@/components/Buttons/Button';
import Comments from '@/components/Comments';
import ImageItem from '@/components/Items/ImageItem';

interface Props {
  contentData: Omit<IContent, 'questions'>;
  onClickPlayBtn: () => void;
}

export default function ContentPreview({ contentData, onClickPlayBtn }: Props) {
  const { _id, title, content, imageUrl, creator, ...count } = contentData;

  return (
    <div className={styles.wrap}>
      <div className={styles.imageContainer}>
        <ImageItem imageUrl={imageUrl} />
        <p>@ {creator}</p>
      </div>

      <div className={styles.contentWrap}>
        <div>
          <h3>{title}</h3>
          <p className={styles.contentText}>{content}</p>
        </div>
        <div className={styles.playBtnWrap}>
          <Button size="medium" text="시작하기" onClick={onClickPlayBtn} />
          <p>지금 까지 {count.playCount}명이 함께 했어요!</p>
        </div>
      </div>

      <IconButtonBox contentData={contentData} />

      <Comments contentId={_id} />
    </div>
  );
}
