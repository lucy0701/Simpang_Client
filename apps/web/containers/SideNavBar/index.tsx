import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

interface Props {
  isOpen: boolean;
  onClickMenuBtn: () => void;
}
export default function SideNavBar({ isOpen, onClickMenuBtn }: Props) {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClickMenuBtn();
      }
    }

    if (isOpen) {
      setIsClosing(true);
      document.addEventListener('mousedown', handleClickOutside);
      document.documentElement.classList.add('mobileCoverOpen');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        setIsClosing(false);
        document.documentElement.classList.remove('mobileCoverOpen');
      }, 300);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClickMenuBtn]);

  return (
    <nav className={styles.wrap}>
      {isClosing && (
        <div
          className={`${styles.meunWrap} ${isOpen ? styles.open : styles.closed}`}>
          <ul ref={menuRef}>
            <li>
              <h2>SIM PANG</h2>
            </li>
            <li>
              <ul>
                <li>TITLE01</li>
                <li>
                  <Link href='/' onClick={onClickMenuBtn}>
                    Home
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li>TITLE02</li>
                <li>
                  <Link href='/' onClick={onClickMenuBtn}>
                    My page
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li>TITLE03</li>
                <li></li>
                <Link href='/' onClick={onClickMenuBtn}>
                  INFO
                </Link>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
