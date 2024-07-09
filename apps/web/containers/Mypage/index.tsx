'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './index.module.scss';
import ResultList from './ResultList';

import { FloatBtnBox } from '@/components/ButtonBox/FloatBtnBox';
import Button from '@/components/Buttons/Button';
import { Loading } from '@/components/Loading';
import WindowStyle from '@/components/WindowStyles';
import { PATHS, SIMPANG_ALT } from '@/constants';
import { Role } from '@/types';
import { decodeToken_csr } from '@/utils';
import { dateSplit } from '@/utils/dateTime';

interface UserProps {
  role: Role;
  name: string;
  thumbnail: string;
  createdAt: string;
}

export default function Mypage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProps>();
  const [role, setRole] = useState<string>();

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => decodeToken_csr(),
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      const roleTagMap: { [key: string]: string } = {
        Admin: '관리자',
        Creater: '크리에이터',
        User: '회원',
      };

      setRole(roleTagMap[data.role] || '');
    }
  }, [data]);

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
              <p className={styles.roleTag}>{role}</p>
            </div>

            <div className={styles.user}>
              <p>{dateSplit(user.createdAt)}</p>
            </div>
          </div>
        </div>
        {(user.role === 'Admin' || user.role === 'Creator') && (
          <Button text={'컨텐츠 만들기'} onClick={onClikeCreateBtn} />
        )}
        <WindowStyle title="나의 결과 목록">
          <ResultList />
        </WindowStyle>

        <FloatBtnBox />
      </div>
    )
  );
}
