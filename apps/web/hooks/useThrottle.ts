import { useRef } from 'react';

const useThrottle = <T>(callback: (args: T) => void, limit = 300): ((args: T) => void) => {
  const inThrottle = useRef(false);

  const throttledCallback = (args: T) => {
    if (!inThrottle.current) {
      callback(args);
      inThrottle.current = true;
      setTimeout(() => {
        inThrottle.current = false;
      }, limit);
    }
  };

  return throttledCallback;
};

export default useThrottle;
