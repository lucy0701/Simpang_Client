'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import SideNavBar from '../SideNavBar';
import { PATHS, SIMPANG_ALT } from '@/constants';
import { useRouter } from 'next/navigation';
import cx from 'classnames';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);
  const router = useRouter();

  const onClickMenuBtn = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsDown(true);
      } else {
        setIsDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cx(styles.wrap, isDown ? styles.scrollDown : '')}>
      <SideNavBar isOpen={isOpen} onClickMenuBtn={onClickMenuBtn} />

      <div className={styles.headerBox}>
        <div className={styles.btnBox}>
          <button className={styles.menuBtn} onClick={onClickMenuBtn} />
        </div>

        <Link className={styles.logo} href={PATHS.HOME}>
          <h1>심팡</h1>
          <div
            className={cx(styles.imageWrap, isDown ? styles.scrollDownLogo : styles.scrollupLogo)}
          >
            <Image priority alt={SIMPANG_ALT} src="/images/simpang_title.png" fill sizes="100%" />
          </div>
        </Link>

        <div className={styles.btnBox}>
          <button className={styles.searchBtn} />
          <button className={styles.loginBtn} onClick={() => router.push(PATHS.LOGIN)} />
        </div>
      </div>
    </header>
  );
}
