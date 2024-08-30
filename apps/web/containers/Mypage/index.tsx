'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PATHS, SIMPANG_ALT } from '@/constants';
import { getLikeContentsAPI, getUserAPI, getUserResultsAPI, kakaoUnlinkAPI } from '@/services';
import { dateSplit } from '@/utils';

import ContentList from './ContentList';
import styles from './index.module.scss';
import { FloatBtnBox } from '@/components/ButtonBox/FloatBtnBox';
import Button from '@/components/Buttons/Button';
import Category from '@/components/Category';
import LikeContentItem from '@/components/Items/LikeContentItem';
import ResultItem from '@/components/Items/ResultItem';
import { Loading } from '@/components/Loading';
import ModalContent from '@/components/ModalContent';
import ModalPortal from '@/components/ModalPortal';
import WindowStyle from '@/components/WindowStyles';

interface CategoryProps {
  key: string;
  name: string;
}

const categorys: CategoryProps[] = [
  {
    key: 'results',
    name: '나의 결과',
  },
  {
    name: '좋아요',
    key: 'likes',
  },
];

export default function Mypage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentCategory, setCurrentCategorys] = useState<CategoryProps>({
    key: 'results',
    name: '나의 결과',
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserAPI(),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: kakaoUnlinkAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push(PATHS.HOME);
    },
  });

  const handleModal = () => setShowModal(!showModal);

  const onClikeDeleteUserBtn = () => {
    deleteUser();
  };

  const onClikeCreateBtn = () => router.push(PATHS.CONTENTS.REGISTER);

  return isLoading ? (
    <Loading />
  ) : user ? (
    <>
      <div className={styles.wrap}>
        <div className={styles.userWrap}>
          <Image alt={SIMPANG_ALT + '유저 프로필'} src={user.thumbnail} width={50} height={50} />

          <div className={styles.userInfo}>
            <div className={styles.user}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.roleTag}>{user.role}</p>
            </div>

            <div className={styles.user}>
              <p className={styles.createdAt}>{dateSplit(user.createdAt)}</p>
              {(user.role === 'Admin' || user.role === 'Creator') && (
                <button className={styles.addContentBtn} onClick={onClikeCreateBtn}>
                  컨텐츠 추가
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.categoryContainer}>
          <WindowStyle color="yellow" title="카테고리">
            {categorys.map((category) => (
              <Category
                key={category.key}
                category={category.name}
                currentCategory={currentCategory?.name}
                onClick={() => setCurrentCategorys(category)}
              />
            ))}
          </WindowStyle>
        </div>

        <div className={styles.windowWrap}>
          <WindowStyle
            title={currentCategory?.key === 'likes' ? '좋아요 ❤️ 목록' : '결과 ⭐️ 목록'}
            color={currentCategory?.key === 'likes' ? 'pink' : 'green'}
          >
            {currentCategory?.key === 'results' && (
              <ContentList
                queryKey={['userResult']}
                queryFn={getUserResultsAPI}
                itemComponent={ResultItem}
                contentIdKey="_id"
              />
            )}
            {currentCategory?.key === 'likes' && (
              <ContentList
                queryKey={['likeContents']}
                queryFn={getLikeContentsAPI}
                itemComponent={LikeContentItem}
                contentIdKey="contentId"
                size={10}
              />
            )}
          </WindowStyle>

          <button className={styles.deleteUserBtn} onClick={handleModal}>
            회원 탈퇴
          </button>
        </div>
      </div>

      <FloatBtnBox />

      <ModalPortal>
        <ModalContent
          title="회원 탈퇴"
          content={`회원 탈퇴시 \n 모든 데이터가 삭제됩니다.\n 탈퇴 하시겠습니까? 🥺`}
          buttonText="탈퇴하기"
          onClickCheckBtn={onClikeDeleteUserBtn}
          onClickCancelBtn={handleModal}
          showModal={showModal}
        />
      </ModalPortal>
    </>
  ) : (
    <WindowStyle>
      <div className={styles.nonLoginContainer}>
        <h2 className={styles.nonLoginText}>로그인이 필요합니다.</h2>
        <Button onClick={() => router.push(PATHS.HOME)} color="yellow" text="홈으로" />
        <Button onClick={() => router.push(PATHS.LOGIN)} color="yellow" text="로그인 하기" />
      </div>
    </WindowStyle>
  );
}
