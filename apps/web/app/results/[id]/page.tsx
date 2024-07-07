import { BE_URL } from '@/constants';
import ContentResult from '@/containers/ContentResult';
import { IResult } from '@/types';

export default async function Page({ params }: { params: { id: string } }) {
  const resultData = await fetch(`${BE_URL}/api/v1/results/${params.id}`).then(
    (res) => res.json() as Promise<IResult>,
  );
    
  return <ContentResult resultData={resultData} />;
}
