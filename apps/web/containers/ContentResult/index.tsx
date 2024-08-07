'use client';

import { IResult } from '@/types';

import styles from './index.module.scss';
import { ResultIconButtonBox } from '@/components/ButtonBox/IconButtonBox';
import { ResultKakaoSharingBtn } from '@/components/ButtonBox/SharingButtons';
import Comments from '@/components/Comments';
import ImageItem from '@/components/Items/ImageItem';
import { CoupangBanner_02 } from '@/components/lib/CoupangBanner';
import CoupangPage from '@/components/lib/CoupangPage';

interface Props {
  resultData: IResult;
}

export default function ContentResult({ resultData }: Props) {
  const { contentId, title, content, imageUrl } = resultData;

  return (
    <div className={styles.wrap}>
      <CoupangPage />
      <div className={styles.contentWrap}>
        <div className={styles.imageWrap}>
          <ImageItem imageUrl={imageUrl!} />
        </div>
        <h3>{title}</h3>
        <div className={styles.content}>
          <p className={styles.contentText}>{content}</p>
        </div>

        <ResultKakaoSharingBtn resultData={resultData} />
        <ResultIconButtonBox resultData={resultData} />
        <CoupangBanner_02 />

        <Comments contentId={contentId} />
      </div>
    </div>
  );
}
