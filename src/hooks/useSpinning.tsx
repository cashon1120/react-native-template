import {useEffect} from 'react';
import {Spinning} from '@/components/common/Index';
const useSpinning = () => {
  useEffect(() => {
    return () => {
      Spinning.clear();
    };
  }, []);
  return Spinning;
};

export default useSpinning;
