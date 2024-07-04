import Comments from '@/components/Comments';
import ImageItem from '@/components/Items/ImageItem';
import { IResult } from '@/types';

interface Props {
  resultData: IResult;
}

export default function ContentResult({ resultData }: Props) {
  const { contentId, title, content, imageUrl } = resultData;

  return (
    <div>
      <ImageItem skin="reuslt" imageUrl={imageUrl!} />
      <h3>{title}</h3>
      <p>{content}</p>

      <div>
        <Comments contentId={contentId} />
      </div>
    </div>
  );
}
