'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './index.module.scss';

const CatLoading = () => (
  <div className={styles.wrap}>
    <DotLottieReact  src="/catLoading.json" loop autoplay />;
  </div>
);

export default CatLoading;
