'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PATHS } from '@/constants';
import { apiBe, getHeaders } from '@/services';
import { INotice, NoticeType } from '@/types';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';

const NOTICE_TYPE: NoticeType[] = ['update', 'notice'];

export default function NoticeRegister() {
  const [data, setData] = useState<INotice>({
    title: '',
    content: '',
    type: 'notice',
  });

  const router = useRouter();

  const handleInputChange = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const headers = getHeaders();

    try {
      await apiBe.post('/v1/notices', data, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });

      router.push(PATHS.CONTENTS.SUCCESS);
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  return (
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
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </label>
      </div>

      <label className={styles.contentLabel}>
        <textarea
          name="content"
          rows={10}
          onChange={(e) => handleInputChange('content', e.target.value)}
        />
      </label>

      <div className={styles.btnBox}>
        <Button size="small" text="취소" onClick={() => router.push(PATHS.NOTICES.BASE)} />
        <Button size="small" type="submit" text="저장" />
      </div>
    </form>
  );
}
