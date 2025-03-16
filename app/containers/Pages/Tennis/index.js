import { Loading, OuterHeading } from '@/components';
import OuterMarketTennis from '@/components/Tennis/OuterMarketTennis';
import useTennisOuter from '@/hooks/useTennisOuter';
import React from 'react';

const Tennis = () => {
  const { inplayFalse, inplayTrue, loaderOneTime } = useTennisOuter();
  return (
    <>
      {!loaderOneTime && <Loading />}
      <div className=" pb-20">
        <OuterHeading />
        <OuterMarketTennis data={inplayTrue} />
        <OuterMarketTennis data={inplayFalse} />
      </div>
    </>
  );
};

export default Tennis;
