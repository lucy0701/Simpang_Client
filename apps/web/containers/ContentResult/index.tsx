import ImageItem from '@/components/Items';
import { Result } from '@/types';

interface Props {
  resultData: Result;
}

export default function ContentResult({ resultData }: Props) {
  const { contentId, title, content, imageUrl } = resultData;

  return (
    <div>
      <ImageItem imageUrl={imageUrl} />
      <h3>{title}</h3>
      <p>{content}</p>

      <div>댓글 영역</div>
    </div>
  );
}
