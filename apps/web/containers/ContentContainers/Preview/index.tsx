'use client';
import { IContent } from '@/types';
import styles from './index.module.scss';
import Button from '@/components/Buttons';
import Comments from '@/components/Comments';
import ImageItem from '@/components/Items/ImageItem';
import { IconButtonBox } from '@/components/IconButtonBox';

interface Props {
  contentData: Omit<IContent, 'questions'>;
  onClickPlayBtn: () => void;
}

export default function ContentPreview({ contentData, onClickPlayBtn }: Props) {
  const { _id, title, content, imageUrl, creator, ...count } = contentData;
  return (
    <div className={styles.wrap}>
      <ImageItem imageUrl={imageUrl} />

      <div className={styles.contentWrap}>
        <h3>{title}</h3>
        <p>{content}</p>
        <Button size="medium" text="시작하기" onClick={onClickPlayBtn} />
        <p>지금 까지 {count.playCount}명이 함께 했어요!</p>
      </div>

      <IconButtonBox contentData={contentData} />

      <div>
        <Comments contentId={_id} />
      </div>
    </div>
  );
}
