'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PATHS } from '@/constants';
import { apiBe, getHeaders } from '@/services';
import { DecodedToken, INotice } from '@/types';
import { decodeToken_csr, dateSplit } from '@/utils';

import styles from './index.module.scss';
import NoticeRegister from '../NoticeRegister';
import Button from '@/components/Buttons/Button';
import WindowStyle from '@/components/WindowStyles';

export default function Notice({ _id, title, content, createdAt, type }: INotice) {
  const [user, setUser] = useState<DecodedToken>();
  const [isUpdate, setIsUpdate] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const userToken = decodeToken_csr();
    if (userToken) {
      setUser(userToken);
    }
  }, []);

  const { mutate: deleteNotice } = useMutation({
    mutationFn: async () => {
      const headers = getHeaders();
      await apiBe.delete(`/v1/notices/${_id}`, { headers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notice'] });
      router.push(PATHS.NOTICES.BASE);
    },
  });

  const onClickUpdateNoticeBtn = () => setIsUpdate(!isUpdate);
  const onClickDeleteNoticeBtn = () => deleteNotice();

  return !isUpdate ? (
    <div className={styles.wrap}>
      <WindowStyle title={title} content={dateSplit(createdAt!)}>
        <div className={styles.contentWrap}>
          <p className={styles.content}>{content}</p>
          <Button text="목록" size="small" onClick={() => router.push(PATHS.NOTICES.BASE)} />
        </div>
      </WindowStyle>
      {user?.role === 'Admin' && (
        <div className={styles.btnBox}>
          <button onClick={onClickUpdateNoticeBtn}>수정</button>
          <button onClick={onClickDeleteNoticeBtn}>삭제</button>
        </div>
      )}
    </div>
  ) : (
    <NoticeRegister
      isUpdate={isUpdate}
      id={_id}
      title={title}
      content={content}
      type={type}
      setUpdate={onClickUpdateNoticeBtn}
    />
  );
}
