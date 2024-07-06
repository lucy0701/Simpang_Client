import Button, { FloatButtonPosition } from '.';

interface Props {
  position?: FloatButtonPosition;
}

const FloatTopBtn = ({ position = 'left' }: Props) => {
  const onClickScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return <Button text="Top" position={position} skin="float" onClick={onClickScrollToTop} />;
};

export default FloatTopBtn;
