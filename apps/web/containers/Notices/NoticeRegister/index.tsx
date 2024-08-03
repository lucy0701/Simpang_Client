'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PATHS } from '@/constants';
import { apiBe, getHeaders } from '@/services';
import { INotice, NoticeType } from '@/types';
import { decodeToken_csr } from '@/utils';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';
import WindowStyle from '@/components/WindowStyles';

const NOTICE_TYPE: NoticeType[] = ['update', 'notice'];

interface Props {
  isUpdate?: boolean;
  id?: string;
  type?: NoticeType;
  title?: string;
  content?: string;
  setUpdate?: () => void;
}

export default function NoticeRegister({ isUpdate, id, type, title, content, setUpdate }: Props) {
  const [data, setData] = useState<INotice>({
    title: '',
    content: '',
    type: 'notice',
  });
  const user = decodeToken_csr();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleInputChange = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const { mutate } = useMutation({
    mutationFn: async () => {
      const headers = getHeaders();
      if (isUpdate && id) {
        await apiBe.patch(`/v1/notices/${id}`, { noticeData: data }, { headers });
      } else {
        await apiBe.post('/v1/notices', data, { headers });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notice'] });
      isUpdate && setUpdate ? setUpdate() : router.push(PATHS.NOTICES.BASE);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (isUpdate && type && title) {
      setData({ type, title, content });
    }
  }, []);

  return user?.role === 'Admin' ? (
    <form className={styles.formWrap} onSubmit={onSubmit}>
      <div className={styles.titleBox}>
        <select
          name="type"
          value={data.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
        >
          {NOTICE_TYPE.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <label className={styles.titleLabel}>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </label>
      </div>

      <label className={styles.contentLabel}>
        <textarea
          name="content"
          rows={10}
          value={data.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
        />
      </label>

      <div className={styles.btnBox}>
        <Button size="small" text="취소" onClick={() => router.push(PATHS.NOTICES.BASE)} />
        <Button size="small" type="submit" text="저장" />
      </div>
    </form>
  ) : (
    <WindowStyle>
      <div className={styles.nonLoginContainer}>
        <h2 className={styles.nonLoginText}>접근 권한이 필요합니다.</h2>
        <Button onClick={() => router.push(PATHS.HOME)} color="yellow" text="홈으로" />
        <Button onClick={() => router.push(PATHS.LOGIN)} color="yellow" text="로그인 하기" />
      </div>
    </WindowStyle>
  );
}
