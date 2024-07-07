import Button, { FloatButtonPosition } from '.';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/constants';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

interface Props {
  position?: FloatButtonPosition;
}

export const FloatTopBtn = ({ position = 'left' }: Props) => {
  const onClickScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return <Button text="Top" position={position} skin="float" onClick={onClickScrollToTop} />;
};

export const RandomButton = ({ position = 'right' }: Props) => {
  const router = useRouter();
  return (
    <Button
      text="Random"
      skin="float"
      position={position}
      onClick={() => router.push(PATHS.CONTENTS.RAMDOM)}
    />
  );
};

export const FloatBtnBox = () => {
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={cx(styles.floatBtnBox, showButton ? styles.show : styles.hide)}>
      <FloatTopBtn />
      <RandomButton />
    </div>
  );
};
