'use client';

import { useState } from 'react';
import ContentPreview from './Preview';
import { IContent } from '@/types';
import ContentPlay from './Play';

interface Props {
  contentData: IContent;
}

export default function ContentContainer({ contentData }: Props) {
  const { questions, ...content } = contentData;

  const [onPlay, setOnPlay] = useState<boolean>(false);

  const onClickPlayBtn = () => setOnPlay(!onPlay);

  return (
    contentData && (
      <div>
        {onPlay ? (
          <ContentPreview contentData={content} onClickPlayBtn={onClickPlayBtn} />
        ) : (
          <ContentPlay questions={questions} contentId={content._id} />
        )}
      </div>
    )
  );
}
