'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PATHS, SIMPANG_ALT } from '@/constants';
import { getUserAPI, kakaoUnlinkAPI } from '@/services';
import { dateSplit } from '@/utils/dateTime';

import styles from './index.module.scss';
import ResultList from './ResultList';
import { FloatBtnBox } from '@/components/ButtonBox/FloatBtnBox';
import Button from '@/components/Buttons/Button';
import { Loading } from '@/components/Loading';
import ModalContent from '@/components/ModalContent';
import ModalPortal from '@/components/ModalPortal';
import WindowStyle from '@/components/WindowStyles';

export default function Mypage() {
  const [showModal, setShowModal] = useState<boolean>(false);

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
    },
  });

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const onClikeDeleteUserBtn = () => {
    deleteUser();
    router.push(PATHS.HOME);
  };

  const onClikeCreateBtn = () => router.push(PATHS.CONTENTS.REGISTER);

  return isLoading ? (
    <Loading />
  ) : (
    user && (
      <div className={styles.wrap}>
        <div className={styles.userWrap}>
          <Image alt={SIMPANG_ALT + '유저 프로필'} src={user.thumbnail} width={60} height={60} />

          <div className={styles.userInfo}>
            <div className={styles.user}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.roleTag}>{user.role}</p>
            </div>

            <div className={styles.user}>
              <p>{dateSplit(user.createdAt)}</p>
              <button className={styles.deleteUserBtn} onClick={handleModal}>
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>

        {(user.role === 'Admin' || user.role === 'Creator') && (
          <Button color="yellow" size="medium" text={'컨텐츠 만들기'} onClick={onClikeCreateBtn} />
        )}

        <WindowStyle title="나의 결과 목록">
          <ResultList />
        </WindowStyle>

        <FloatBtnBox />

        <ModalPortal>
          <ModalContent
            title="회원 탈퇴"
            content={`회원 탈퇴시 \n 모든 데이터가 삭제됩니다.\n 탈퇴 하시겠습니까?`}
            buttonText="탈퇴하기"
            onClickCheckBtn={onClikeDeleteUserBtn}
            onClickCancelBtn={handleModal}
            showModal={showModal}
          />
        </ModalPortal>
      </div>
    )
  );
}
