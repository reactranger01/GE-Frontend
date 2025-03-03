import { OuterHeading } from '@/components';
import OuterMarketCricket from '@/components/Cricket/OuterMarketCricket';
import OuterMarketFootball from '@/components/Football/OuterMarketFootball';
import OuterMarketTennis from '@/components/Tennis/OuterMarketTennis';
import useCricketOuter from '@/hooks/useCricketOuter';
import useFootballOuter from '@/hooks/useFootballOuter';
import useTennisOuter from '@/hooks/useTennisOuter';
import React from 'react';

const InplayPage = () => {
  const cricketData = useCricketOuter();
  const footballData = useFootballOuter();
  const tennisData = useTennisOuter();
  return (
    <div className=" pb-20">
      <OuterHeading />
      <OuterMarketCricket data={cricketData?.inplayTrue} />
      <OuterMarketFootball data={footballData?.inplayTrue} />
      <OuterMarketTennis data={tennisData?.inplayTrue} />
    </div>
  );
};

export default InplayPage;
