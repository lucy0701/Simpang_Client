'use client';

import ImageItem from '@/components/Items/ImageItem';
import { PATHS } from '@/constants';
import { Role } from '@/types';
import { decodeToken_csr } from '@/utils';
import { dateSplit } from '@/utils/dateTime';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './index.module.scss';
import ResultList from './ResultList';
import Loading from '@/components/Loading';
import { FloatTopBtn } from '@/components/Buttons/FloatTopBtn';
import RandomButton from '@/components/Buttons/RandomBtn';

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
          <ImageItem skin="thumbnail" imageUrl={user.thumbnail} />

          <div className={styles.userInfo}>
            <div className={styles.user}>
              <p>{user.name}</p>
              <p className={styles.roleTag}>{role}</p>
            </div>

            <div className={styles.user}>
              <p>{dateSplit(user.createdAt)}</p>
            </div>
          </div>
        </div>
        {(user.role === 'Admin' || user.role === 'Creator') && (
          <button className={styles.createBtn} onClick={onClikeCreateBtn}>
            컨텐츠 만들기
          </button>
        )}
        <ResultList />
        <FloatTopBtn position="right" />
        <RandomButton position="left" />
      </div>
    )
  );
}
