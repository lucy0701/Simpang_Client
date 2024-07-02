'use client';
import { Contents } from '@/types';
import styles from './index.module.scss';

import Title from '@/components/Title';
import ImageItem from '@/components/Items';
import RandomButton from '@/components/Buttons/RandomBtn';

interface Props {
  latestContents: Contents[];
}

export default function Home({ latestContents }: Props) {
  return (
    <div>
      <div className={styles.bannerWrap}>슬라이드 배너</div>
      <Title title="New" content="즐겨보세용" />
      <div>
        {latestContents.map((content) => (
          <ImageItem key={content._id} {...content} />
        ))}
      </div>
      <RandomButton />
    </div>
  );
}
