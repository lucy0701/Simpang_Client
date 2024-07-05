import Comments from '@/components/Comments';
import { ResultIconButtonBox } from '@/components/IconButtonBox';
import { ResultKakaoSharingBtn } from '@/components/IconButtonBox/SharingButton';
import ImageItem from '@/components/Items/ImageItem';
import { IResult } from '@/types';

import styles from './index.module.scss';

interface Props {
  resultData: IResult;
}

export default function ContentResult({ resultData }: Props) {
  const { contentId, title, content, imageUrl } = resultData;

  return (
    <div className={styles.wrap}>
      <ImageItem skin="reuslt" imageUrl={imageUrl!} />
      <h3>{title}</h3>
      <p>{content}</p>

      <ResultKakaoSharingBtn resultData={resultData} />
      <ResultIconButtonBox resultData={resultData} />

      <div>
        <Comments contentId={contentId} />
      </div>
    </div>
  );
}
