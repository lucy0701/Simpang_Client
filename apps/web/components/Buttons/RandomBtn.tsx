import { useRouter } from 'next/navigation';
import Button from '.';
import { PATHS } from '@/constants';

const RandomButton = () => {
  const router = useRouter();
  return <Button text="Random" skin="float" onClick={() => router.push(PATHS.CONTENTS.RAMDOM)} />;
};

export default RandomButton;
