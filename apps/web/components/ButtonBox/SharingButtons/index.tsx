'use client';

import { shareKakaotalk, shareKakaotalkResult } from '@/services';
import { postShareAPI } from '@/services/contents';

import { ContentData, ResultData } from '../IconButtons';
import Button from '@/components/Buttons/Button';
import IconButton from '@/components/Buttons/IconButton';

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
    <IconButton
      size={ICON_SIZE}
      onClick={onClickTestShareBtn}
      text="공유하기"
      iconSrc="/images/kakaotalk_sharing.png"
      altText="카카오 공유 버튼"
      isFullIcon={true}
    />
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

  return <Button text="공유하기" size="medium" onClick={onClickRsultShareBtn} />;
};
