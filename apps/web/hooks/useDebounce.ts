import { useRef } from 'react';

const useDebounce = <T>(callback: (args: T) => void, timeout = 300): ((args: T) => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = (args: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(args);
    }, timeout);
  };

  return debouncedCallback;
};

export default useDebounce;
