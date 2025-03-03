import { OuterHeading } from '@/components';
import OuterMarketCricket from '@/components/Cricket/OuterMarketCricket';
import useCricketOuter from '@/hooks/useCricketOuter';
import React from 'react';

const Cricket = () => {
  const { inplayFalse, inplayTrue } = useCricketOuter();
  return (
    <div className=" pb-20">
      <OuterHeading />
      <OuterMarketCricket data={inplayTrue} />
      <OuterMarketCricket data={inplayFalse} />
    </div>
  );
};

export default Cricket;
