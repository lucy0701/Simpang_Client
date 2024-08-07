'use client';
import { useEffect, useState } from 'react';

import { COUPANG_VISIT, IS_COUPANG } from '@/constants';
import { checkCoupangSiteVisit } from '@/utils';

import styles from './index.module.scss';
import { CoupangBanner_01, CoupangBanner_02 } from '../CoupangBanner';

const CoupangPage = () => {
  const [count, setCount] = useState(5);
  const [showCoupang, setShowCoupang] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const isCoupangState = sessionStorage.getItem(IS_COUPANG);

    if (isCoupangState === 'true') {
      const checkCoupang = checkCoupangSiteVisit();

      if (checkCoupang) {
        setShowCoupang(checkCoupang);
      }
    } else {
      setShowCoupang(false);
    }
  }, []);

  const onClickCoupangBtn = () => {
    const link = 'https://link.coupang.com/a/bMBa24';
    const currentDate = new Date();
    const dateString = currentDate.toISOString();

    localStorage.setItem(COUPANG_VISIT, dateString);
    window.open(link, '_blank');
    sessionStorage.removeItem(IS_COUPANG);
    setShowCoupang(false);
  };

  const onClickCloseBtn = () => {
    sessionStorage.removeItem(IS_COUPANG);
    setShowCoupang(false);
  };

  return (
    showCoupang && (
      <main className={styles.wrap}>
        <div className={styles.contentsWrap}>
          <CoupangBanner_01 />
          <div className={styles.buttonWrap}>
            <button className={styles.closeBtn} onClick={onClickCloseBtn} disabled={count > 0}>
              {count > 0 ? `${count}` : 'X'}
            </button>

            <button onClick={onClickCoupangBtn} id="coupangBtn" className={styles.coupangButton}>
              쿠팡 다녀와서 결과 확인 하기
            </button>

            <div className={styles.textBox}>
              <p>쿠팡 다녀오면</p>
              <p>12시간 동안 광고 없이 무제한 이용</p>
            </div>
          </div>
          <CoupangBanner_02 />
        </div>
      </main>
    )
  );
};

export default CoupangPage;
