'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PATHS, SIMPANG_ALT } from '@/constants';
import { setKakaoLogin } from '@/services';
import { decodeToken_csr } from '@/utils';

import styles from './index.module.scss';

export default function KakaoLogin() {
  const token = decodeToken_csr();

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push(PATHS.HOME);
    }
  }, [token, router]);

  return (
    <div className={styles.wrap}>
      <div className={styles.imageBox}>
        <Image alt={SIMPANG_ALT} src="/images/pang.png" width={70} height={70} />
        <Image alt={SIMPANG_ALT} src="/images/simpang_logo.png" width={200} height={80} />
      </div>

      <p>간편하게 로그인하고 즐겨요!</p>

      <button onClick={setKakaoLogin}>
        <Image alt="Kakao Login Button" width={300} height={45} src="/images/kakaoLogInBtn.png" />
      </button>
    </div>
  );
}
