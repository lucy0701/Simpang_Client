import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { PATHS } from '@/constants';
import { kakaoLogoutAPI } from '@/services';
import { decodeToken_csr } from '@/utils';

import styles from './index.module.scss';

interface Props {
  isOpen: boolean;
  onClickMenuBtn: () => void;
}
export default function SideNavBar({ isOpen, onClickMenuBtn }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();
  const menuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const queryClient = useQueryClient();
  const user = decodeToken_csr();

  const { mutate: kakaoLogout } = useMutation({
    mutationKey: ['login'],
    mutationFn: () => kakaoLogoutAPI(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['login'] });
      queryClient.invalidateQueries({ queryKey: ['like'] });
      window.location.reload();
    },
  });

  const onClickLogoutBtn = () => {
    kakaoLogout();
    onClickMenuBtn();
  };

  const onClickHomeLogoBtn = () => {
    router.push(PATHS.HOME);
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
      }, 400);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClickMenuBtn]);

  return (
    <nav>
      {isMenuOpen && (
        <div className={`${styles.meunWrap} ${isOpen ? styles.open : styles.closed}`}>
          <ul ref={menuRef}>
            <li className={styles.logoLink}>
              <button onClick={onClickHomeLogoBtn}>
                <Image priority alt="심팡" src="/images/pang.png" width={60} height={60} />
              </button>
            </li>
            {user ? (
              <li>
                <Link href={PATHS.MY_PAGE} onClick={onClickMenuBtn}>
                  <div className={styles.mypageIcon} />
                  마이페이지
                </Link>
              </li>
            ) : (
              <li className={styles.loginLink}>
                <Link href={PATHS.LOGIN} onClick={onClickMenuBtn}>
                  로그인 하기
                </Link>
              </li>
            )}
            <li>
              <Link href={PATHS.NOTICES.BASE} onClick={onClickMenuBtn}>
                <div className={styles.noticeIcon} />
                공지 사항
              </Link>
            </li>
            <li>
              <Link href={PATHS.ABOUT.SITE_INFO} onClick={onClickMenuBtn}>
                <div className={styles.infoIcon} />
                심팡 소개
              </Link>
            </li>
            <li>
              <Link href={PATHS.ABOUT.DEV_INFO} onClick={onClickMenuBtn}>
                <div className={styles.ghostIcon} />
                개발자 소개
              </Link>
            </li>
            {user && (
              <li>
                <button className={styles.logoutBtn} onClick={onClickLogoutBtn}>
                  Logout
                  <div className={styles.logoutIcon} />
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
