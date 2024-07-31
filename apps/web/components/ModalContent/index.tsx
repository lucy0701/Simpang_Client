'use client';

import { useCallback, useEffect, useRef } from 'react';

import styles from './index.module.scss';
import WindowStyle from '../WindowStyles';

interface Props {
  title?: string;
  content?: string;
  buttonText?: string;
  showModal: boolean;
  onClickCheckBtn?: () => void;
  onClickCancelBtn: () => void;
}

const ModalContent = ({
  title,
  content,
  buttonText,
  showModal,
  onClickCheckBtn,
  onClickCancelBtn,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClickCancelBtn();
      }
      if (event.key === 'Enter' && onClickCheckBtn) {
        onClickCheckBtn();
      }
    },
    [onClickCancelBtn],
  );

  const handleClickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClickCancelBtn();
      }
    },
    [onClickCancelBtn],
  );

  useEffect(() => {
    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickModalOutside);
      document.documentElement.classList.add('mobileCoverOpen');
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickModalOutside);
      document.documentElement.classList.remove('mobileCoverOpen');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickModalOutside);
    };
  }, [showModal, handleKeyDown]);

  if (!showModal) return null;

  return (
    showModal && (
      <div className={styles.wrap}>
        <div className={styles.modalContainer} ref={modalRef}>
          <div className={styles.modalWrap}>
            <button className={styles.topCloseBtn} onClick={onClickCancelBtn} />
            <WindowStyle title={title} color="blue">
              <div className={styles.modal}>
                <p>{content}</p>
                <div className={styles.modalBtnBox}>
                  <button onClick={onClickCancelBtn}>닫기</button>
                  {onClickCheckBtn && (
                    <button className={styles.checkBtn} onClick={onClickCheckBtn}>
                      {buttonText}
                    </button>
                  )}
                </div>
              </div>
            </WindowStyle>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalContent;
