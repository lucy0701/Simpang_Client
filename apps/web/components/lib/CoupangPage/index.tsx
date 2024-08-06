'use client';
import { useEffect, useRef, useState } from 'react';

import { COUPANG_VISIT, IS_COUPANG } from '@/constants';

import styles from './index.module.scss';
import { CoupangBanner_02 } from '../CoupangBanner';

export default function CoupangPage() {
  const coupangBtnRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(7);

  useEffect(() => {
    const onClickCoupangBtn = () => {
      const link = 'https://link.coupang.com/a/bMBa24';
      saveCoupangVisitDate();
      sessionStorage.setItem(IS_COUPANG, 'false');
      window.open(link, '_blank');
    };

    if (typeof window !== 'undefined' && coupangBtnRef.current) {
      coupangBtnRef.current.addEventListener('click', onClickCoupangBtn);
    }
    return () => {
      if (typeof window !== 'undefined' && coupangBtnRef.current) {
        coupangBtnRef.current.removeEventListener('click', onClickCoupangBtn);
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function saveCoupangVisitDate() {
    const currentDate = new Date();
    const dateString = currentDate.toISOString();
    localStorage.setItem(COUPANG_VISIT, dateString);
  }
  const onClickCloseBtn = () => {
    sessionStorage.setItem(IS_COUPANG, 'false');
  };

  return (
    <main className={styles.wrap}>
      <div className={styles.contentsWrap}>
        <button ref={coupangBtnRef} id="coupangBtn" className={styles.coupangButton}>
          쿠팡 다녀와서 결과 확인 하기
        </button>
        <div className={styles.bannerWrap}>
          <button className={styles.closeBtn} onClick={onClickCloseBtn} disabled={count > 0}>
            {count > 0 ? `${count}` : 'X'}
          </button>
          <CoupangBanner_02 />
        </div>
        <div className={styles.textBox}>
          <p>쿠팡 다녀오면</p>
          <p>12시간 동안 광고 없이 무제한 이용</p>
        </div>
      </div>
    </main>
  );
}
