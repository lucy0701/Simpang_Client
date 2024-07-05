import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

import { PATHS } from '@/constants';
import { kakaoLogoutAPI } from '@/services';
import { decodeToken_csr } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  isOpen: boolean;
  onClickMenuBtn: () => void;
}
export default function SideNavBar({ isOpen, onClickMenuBtn }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const queryClient = useQueryClient();

  const user = decodeToken_csr();

  const { mutate: kakaoLogout } = useMutation({
    mutationKey: ['login'],
    mutationFn: () => kakaoLogoutAPI(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['login'] });
      queryClient.invalidateQueries({ queryKey: ['like'] });
    },
  });

  const onClickLogoutBtn = () => {
    kakaoLogout();
    onClickMenuBtn();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClickMenuBtn();
      }
    }

    if (isOpen) {
      setIsMenuOpen(true);
      document.addEventListener('mousedown', handleClickOutside);
      document.documentElement.classList.add('mobileCoverOpen');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        setIsMenuOpen(false);
        document.documentElement.classList.remove('mobileCoverOpen');
      }, 300);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClickMenuBtn]);

  return (
    <nav className={styles.wrap}>
      {isMenuOpen && (
        <div className={`${styles.meunWrap} ${isOpen ? styles.open : styles.closed}`}>
          <ul ref={menuRef}>
            <li>
              <Link href={PATHS.HOME}>SIM PANG</Link>
            </li>
            <li>
              <h3 className={styles.menuTitle}>심리테스트</h3>
              <ul>
                <li>
                  <Link href={PATHS.CONTENTS.BASE} onClick={onClickMenuBtn}>
                    전체보기
                  </Link>
                </li>
              </ul>
            </li>
            {user && (
              <li>
                <h3 className={styles.menuTitle}>회원 전용</h3>
                <ul>
                  <li>
                    <Link href={PATHS.MY_PAGE} onClick={onClickMenuBtn}>
                      mypage
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li>
              <h3 className={styles.menuTitle}>About</h3>
              <ul>
                <li>
                  <Link href={PATHS.ABOUT.SITE_INFO} onClick={onClickMenuBtn}>
                    심팡 소개
                  </Link>
                </li>
                <li>
                  <Link href={PATHS.ABOUT.DEV_INFO} onClick={onClickMenuBtn}>
                    개발자 소개
                  </Link>
                </li>
              </ul>
            </li>
            {user && (
              <li>
                <button onClick={onClickLogoutBtn}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
