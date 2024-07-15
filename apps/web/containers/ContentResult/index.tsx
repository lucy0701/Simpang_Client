import { IResult } from '@/types';

import styles from './index.module.scss';
import { ResultIconButtonBox } from '@/components/ButtonBox/IconButtonBox';
import { ResultKakaoSharingBtn } from '@/components/ButtonBox/SharingButtons';
import Comments from '@/components/Comments';
import ImageItem from '@/components/Items/ImageItem';

interface Props {
  resultData: IResult;
}

export default function ContentResult({ resultData }: Props) {
  const { contentId, title, content, imageUrl } = resultData;

  return (
    <div className={styles.wrap}>
      <ImageItem skin="reuslt" imageUrl={imageUrl!} />
      <h3>{title}</h3>
      <div className={styles.content}>
        <p className={styles.contentText}>{content}</p>
      </div>

      <ResultKakaoSharingBtn resultData={resultData} />
      <ResultIconButtonBox resultData={resultData} />

      <Comments contentId={contentId} />
    </div>
  );
}
