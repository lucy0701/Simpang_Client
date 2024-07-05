'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './index.module.scss';

const Loading = () => (
  <div className={styles.wrap}>
    <DotLottieReact src="/loadingIcon.json" loop autoplay />
  </div>
);

export default Loading;
