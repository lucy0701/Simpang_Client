'use client';

import { useState } from 'react';
import ContentPreview from './Preview';
import { Content } from '@/types';
import ContentPlay from './Play';

interface Props {
  contentData: Content;
}

export default function ContentContainer({ contentData }: Props) {
  const { questions, ...content } = contentData;

  const [onPlay, setOnPlay] = useState<boolean>(false);

  const onClickPlayBtn = () => setOnPlay(!onPlay);

  return (
    <div>
      {!onPlay ? (
        <ContentPreview contentData={content} onClickPlayBtn={onClickPlayBtn} />
      ) : (
        <ContentPlay questions={questions} contentId={content._id} />
      )}
    </div>
  );
}
