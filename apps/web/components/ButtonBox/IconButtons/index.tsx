'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


import { PATHS } from '@/constants';
import { postShareAPI } from '@/services/contents';
import { getLikeAPI, postLikeAPI } from '@/services/like';
import { IContent, IResult } from '@/types';

import styles from './index.module.scss';
import IconButton from '../../Buttons/IconButton';

export interface ContentData {
  contentData: Omit<IContent, 'questions'>;
}

export interface ResultData {
  resultData: IResult;
}

interface Props {
  contentId: string;
}

const ICON_SIZE = 32;

export const LikeButton = ({ contentId }: Props) => {
  const [likeState, setLikeState] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>(0);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['like', contentId],
    queryFn: () => getLikeAPI(contentId),
  });

  useEffect(() => {
    if (data) {
      setLikeState(data.data.liked);
      setLikeCount(data.data.likeCount);
    }
  }, [data]);

  const { mutate: postLike } = useMutation({
    mutationFn: () => postLikeAPI(contentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['like'] });
      setLikeState(data.liked);
      setLikeCount(data.likeCount);
    },
  });

  const handlePostLike = () => {
    postLike();
  };

  return (
    <IconButton
      size={ICON_SIZE}
      onClick={handlePostLike}
      text={likeCount}
      state={likeState}
      iconSrc="/svgs/like.svg"
      altText="좋아요 버튼"
    />
  );
};

export const LinkButton = ({ contentId }: Props) => {
  const [linkCopyCommand, setLinkCopyCommand] = useState('링크 복사');
  const [copyLink, setCopyLink] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    setCopyLink(window.location.href);
  }, []);

  const onClickcoptURLClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyLink);
      setLinkCopyCommand('복사 완료');
      setActive(true);
      postShareAPI({ contentId, type: 'Link' });
      setTimeout(() => {
        setLinkCopyCommand('링크 복사');
        setActive(false);
      }, 3000);
    } catch (err) {
      alert('복사 실패');
    }
  };

  return (
    <IconButton
      size={ICON_SIZE}
      onClick={onClickcoptURLClipboard}
      text={linkCopyCommand}
      state={active}
      iconSrc="/svgs/link.svg"
      altText="좋아요 버튼"
    />
  );
};

export const ReplayButton = ({ contentId }: Props) => {
  const router = useRouter();
  const onClickBtn = () => router.push(`${PATHS.CONTENTS.BASE}/${contentId}`);

  return (
    <button className={styles.replayBtn} onClick={onClickBtn}>
      <div className={styles.replayIcon} />
      다시 하기
    </button>
  );
};
