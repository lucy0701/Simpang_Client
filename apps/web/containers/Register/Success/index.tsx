'use client';

import { useRouter } from 'next/navigation';

import { PATHS } from '@/constants';

import styles from './index.module.scss';
import Button from '@/components/Buttons/Button';

const Success = () => {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      <div className={styles.textBox}>
        <h2>Success!😊</h2>
        <p>고생하셨습니다!</p>
      </div>
      <div className={styles.btnBox}>
        <Button
          size="medium"
          onClick={() => router.push(PATHS.CONTENTS.REGISTER)}
          text="추가 생성"
        />
        <Button size="medium" onClick={() => router.push(PATHS.HOME)} text="홈으로" />
      </div>
    </div>
  );
};

export default Success;
