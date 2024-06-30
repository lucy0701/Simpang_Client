'use client';

import { useState } from 'react';

import styles from './index.module.scss';
import SideNavBar from '../SideNavBar';

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
      <h1 className={styles.title}>심팡</h1>
    </header>
  );
}
