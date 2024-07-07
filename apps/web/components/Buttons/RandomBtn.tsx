import { useRouter } from 'next/navigation';
import Button, { FloatButtonPosition } from '.';
import { PATHS } from '@/constants';

interface Props {
  position?: FloatButtonPosition;
}

const RandomButton = ({ position = 'right' }: Props) => {
  const router = useRouter();
  return (
    <Button
      text="Random"
      skin="float"
      position={position}
      onClick={() => router.push(PATHS.CONTENTS.RAMDOM)}
    />
  );
};

export default RandomButton;
