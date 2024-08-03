'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PATHS } from '@/constants';
import { DecodedToken, INotice } from '@/types';
import { decodeToken_csr } from '@/utils';
import { dateSplit } from '@/utils/dateTime';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';
import WindowStyle from '@/components/WindowStyles';

export default function Notice({ title, content, createdAt }: INotice) {
  const [user, setUser] = useState<DecodedToken>();
  const router = useRouter();

  useEffect(() => {
    const userToken = decodeToken_csr();
    if (userToken) {
      setUser(userToken);
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <WindowStyle title={title} content={dateSplit(createdAt!)}>
        <div className={styles.contentWrap}>
          <p className={styles.content}>{content}</p>
          <Button text="목록" size="small" onClick={() => router.push(PATHS.NOTICES.BASE)} />
        </div>
      </WindowStyle>
      {user?.role === 'Admin' && (
        <div className={styles.btnBox}>
          <button>수정</button>
          <button>삭제</button>
        </div>
      )}
    </div>
  );
}
