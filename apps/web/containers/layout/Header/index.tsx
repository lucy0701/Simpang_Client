'use client';

import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PATHS, SIMPANG_ALT } from '@/constants';

import styles from './index.module.scss';
import SideNavBar from '../SideNavBar';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);

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
        <button className={styles.menuBtn} onClick={onClickMenuBtn} />

        <Link className={styles.logo} href={PATHS.HOME}>
          <h1>심팡</h1>
          <div
            className={cx(styles.imageWrap, isDown ? styles.scrollDownLogo : styles.scrollupLogo)}
          >
            <Image priority alt={SIMPANG_ALT} src="/images/simpang_logo.png" fill sizes="100%" />
          </div>
        </Link>

        {/* <button className={styles.searchBtn} /> */}
      </div>
    </header>
  );
}
