'use client';

import { shareKakaotalk, shareKakaotalkResult } from '@/services';
import { postShareAPI } from '@/services/contents';
import styles from './index.module.scss';
import { SIMPANG_ALT } from '@/constants';
import Image from 'next/image';
import { ContentData, ResultData } from '.';
import Button from '../Buttons';

const ICON_SIZE = 32;

export const KakaoSharingBtn = ({ contentData }: ContentData) => {
  const {
    _id: contentId,
    title,
    imageUrl,
    content: description,
    likeCount,
    commentCount,
  } = contentData;

  const onClickTestShareBtn = () => {
    shareKakaotalk({
      contentId,
      title,
      imageUrl,
      description,
      likeCount,
      commentCount,
    });
    postShareAPI({ contentId, type: 'Kakao' });
  };

  return (
    <div className={styles.buttonWrap}>
      <button onClick={onClickTestShareBtn}>
        <Image
          alt={SIMPANG_ALT + '카카오 공유 버튼'}
          src="/images/kakaotalk_sharing.png"
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </button>
      <p>공유하기</p>
    </div>
  );
};

export const ResultKakaoSharingBtn = ({ resultData }: ResultData) => {
  const { _id: resultId, contentId, title, imageUrl, content: description } = resultData;

  const defaultImageUrl = imageUrl ? imageUrl : '';

  const onClickRsultShareBtn = () => {
    shareKakaotalkResult({
      contentId,
      resultId,
      title,
      imageUrl: defaultImageUrl,
      description,
    });
    postShareAPI({ contentId, type: 'Kakao' });
  };

  return <Button text="공유하기" onClick={onClickRsultShareBtn} />;
};
