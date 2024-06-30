'use client';

import Link from 'next/link';
import { useState } from 'react';

import styles from './index.module.scss';
import SideNavBar from '../SideNavBar';

import { PATHS } from '@/constants';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickMenuBtn = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className={styles.wrap}>
      <SideNavBar isOpen={isOpen} onClickMenuBtn={onClickMenuBtn} />
      <div className={styles.headerBox}>
        <button className={styles.menuBtn} onClick={onClickMenuBtn} />
        <div className={styles.btnBox}>
          <button className={styles.searchBtn} />
          <button className={styles.loginBtn} />
        </div>
      </div>

      <Link className={styles.titleBtn} href={PATHS.HOME}>
        <h1>심팡</h1>
      </Link>
    </header>
  );
}
