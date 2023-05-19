import React from 'react';
import useSpinning from '@/hooks/useSpinning';
import {Header} from '@/library/Index';
const SpinningDemo = () => {
  const spinning = useSpinning();
  spinning.show('加载中');
  return (
    <>
      <Header text="Spinning" />
    </>
  );
};

export default SpinningDemo;
