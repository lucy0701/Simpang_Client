'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './index.module.scss';

const RoundLoading = () => (
  <DotLottieReact className={styles.roundLoadingWrap} src="/roundLoading.json" loop autoplay />
);

export default RoundLoading;
