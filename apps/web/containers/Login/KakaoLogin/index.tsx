'use client';
import styles from './index.module.scss';

import { setKakaoLogin } from '@/services';
import Image from 'next/image';

export default function KakaoLogin() {
  return (
    <div>
      <button className={styles.wrap} onClick={setKakaoLogin}>
        <Image
          alt='Kakao Login Button'
          width={300}
          height={45}
          src='/images/kakaoLogInBtn.png'
        />
      </button>
    </div>
  );
}
