'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import styles from './index.module.scss';

export const Loading = () => (
  <div className={styles.wrap}>
    <DotLottieReact src="/loadingIcon.json" loop autoplay />
  </div>
);

export const CatLoading = () => (
  <div className={styles.wrap}>
    <DotLottieReact src="/catLoading.json" loop autoplay />
  </div>
);

export const RoundLoading = () => (
  <DotLottieReact className={styles.roundLoadingWrap} src="/roundLoading.json" loop autoplay />
);
