import { Loading, OuterHeading } from '@/components';
import OuterMarketFootball from '@/components/Football/OuterMarketFootball';
import useFootballOuter from '@/hooks/useFootballOuter';
import React from 'react';

const Football = () => {
  const { inplayFalse, inplayTrue, loaderOneTime } = useFootballOuter();
  return (
    <>
      {!loaderOneTime && <Loading />}
      <div className=" pb-20">
        <OuterHeading />
        <OuterMarketFootball data={inplayTrue} />
        <OuterMarketFootball data={inplayFalse} />
      </div>
    </>
  );
};

export default Football;
