import {useEffect} from 'react';
import {Spinning} from '@/library/Index';
const useSpinning = () => {
  useEffect(() => {
    return () => {
      Spinning.clear();
    };
  }, []);
  return Spinning;
};

export default useSpinning;
