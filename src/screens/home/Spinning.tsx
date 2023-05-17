import React from 'react';
import useSpinning from '@/hooks/useSpinning';
import {Header} from '@/components/common/Index';
const SpinningDemo = () => {
  const spinning = useSpinning();
  spinning.show('努力加载中');
  return (
    <>
      <Header text="Spinning" />
    </>
  );
};

export default SpinningDemo;
