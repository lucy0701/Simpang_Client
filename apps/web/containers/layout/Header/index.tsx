'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import styles from './index.module.scss';
import SideNavBar from '../SideNavBar';

import { PATHS } from '@/constants';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
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
          <button className={styles.loginBtn} onClick={() => router.push(PATHS.LOGIN)} />
        </div>
      </div>

      <Link className={styles.titleBtn} href={PATHS.HOME}>
        <h1>심팡</h1>
        <Image priority alt="심팡" src="/images/simpang_title.png" width={220} height={90} />
      </Link>
    </header>
  );
}
