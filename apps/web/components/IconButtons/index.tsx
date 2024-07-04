'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

import cx from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLikeAPI, postLikeAPI } from '@/services/like';
import { SIMPANG_ALT } from '@/constants';

interface Props {
  count: number;
  contentId: string;
}

const ICON_SIZE = 32;

const LinkBtn = () => {
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
      //   if (memberId) postShareData(testId, memberId, 'LINK');
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

const KakaoSharingBtn = () => {
  return (
    <div className={styles.buttonWrap}>
      <button>
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

const LikeBtn = ({ count, contentId }: Props) => {
  const [likeState, setLikeState] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>(count);
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

const IconButtonBox = ({ count, contentId }: Props) => {
  return (
    <div className={styles.btnBox}>
      <LikeBtn count={count} contentId={contentId} />
      <KakaoSharingBtn />
      <LinkBtn />
    </div>
  );
};

export default IconButtonBox;
