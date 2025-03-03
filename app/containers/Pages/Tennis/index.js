import { OuterHeading } from '@/components';
import OuterMarketTennis from '@/components/Tennis/OuterMarketTennis';
import useTennisOuter from '@/hooks/useTennisOuter';
import React from 'react';

const Tennis = () => {
  const { inplayFalse, inplayTrue } = useTennisOuter();
  return (
    <div className=" pb-20">
      <OuterHeading />
      <OuterMarketTennis data={inplayTrue} />
      <OuterMarketTennis data={inplayFalse} />
    </div>
  );
};

export default Tennis;
