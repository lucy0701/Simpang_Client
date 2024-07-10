import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

const ModalPortal = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const el = document.getElementById('modal-root');
  return el ? ReactDom.createPortal(children, el) : null;
};

export default ModalPortal;
