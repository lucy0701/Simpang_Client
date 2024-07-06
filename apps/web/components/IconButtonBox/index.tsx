'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

import cx from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLikeAPI, postLikeAPI } from '@/services/like';
import { PATHS, SIMPANG_ALT } from '@/constants';
import { postShareAPI } from '@/services/contents';
import { useRouter } from 'next/navigation';
import { KakaoSharingBtn } from './SharingButton';
import { IContent, IResult } from '@/types';

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

const LikeButton = ({ contentId }: Props) => {
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
    <div className={styles.buttonWrap}>
      <button onClick={handlePostLike}>
        <Image
          alt={SIMPANG_ALT + '좋아요 버튼'}
          src="/svgs/like.svg"
          className={cx(likeState ? styles.isOn : styles.isOff, styles.btnImage)}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </button>
      <p>{likeCount}</p>
    </div>
  );
};

const LinkButton = ({ contentId }: Props) => {
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
    <div className={styles.buttonWrap}>
      <button onClick={onClickcoptURLClipboard}>
        <Image
          alt={SIMPANG_ALT + '링크 복사 버튼'}
          src="/svgs/link.svg"
          className={cx(active ? styles.isOn : styles.isOff, styles.btnImage)}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </button>
      <p>{linkCopyCommand}</p>
    </div>
  );
};

const ReplayButton = ({ contentId }: Props) => {
  const router = useRouter();
  const onClickBtn = () => router.push(`${PATHS.CONTENTS.BASE}/${contentId}`);

  return (
    <button className={styles.replayBtn} onClick={onClickBtn}>
      다시 하기
    </button>
  );
};

export const IconButtonBox = ({ contentData }: ContentData) => {
  return (
    <div className={cx(styles.btnBox, styles.baseBox)}>
      <LikeButton contentId={contentData._id} />
      <KakaoSharingBtn contentData={contentData} />
      <LinkButton contentId={contentData._id} />
    </div>
  );
};

export const ResultIconButtonBox = ({ resultData }: ResultData) => {
  return (
    <div className={cx(styles.btnBox, styles.resultBox)}>
      <LikeButton contentId={resultData.contentId} />
      <ReplayButton contentId={resultData.contentId} />
      <LinkButton contentId={resultData.contentId} />
    </div>
  );
};
