import React from 'react';
import BettingOdds from '@/components/Cricket/BettingOdds';
import MatchOdd from '@/components/Cricket/MatchOdd';
import Prediction from '@/components/Cricket/Predication';
import Premium from '@/components/Cricket/Premium';
import TopComponent from '@/components/Cricket/TopComponent';
import Sessions from '@/components/Cricket/Sessions';
import RightTopComponent from '@/components/Cricket/RightTopComponent';
import {
  BookmakersCricket,
  MatchOddsCricket,
  SessionsCricket,
} from '@/components';
import useCricketInner from '@/hooks/useCricketInner';
import dayjs from 'dayjs';

const CricketMarket = () => {
  const {
    // isLogin,
    oddsData,
    matchData,
    particularMatchData,
    sessionBooksetClcuData,
    sessionData,
    placedBetWinLossBookmakerData,
    bookmakerData,
    bookmakerTransformData,
    placedBetWinLossDatas,
  } = useCricketInner();
  console.log(oddsData, 'oddsDataoddsData');
  const gameInfo = {
    game: 'India vs Australia',
    dateTime: 'March 20, 2025 - 7:00 PM',
  };

  const gamePredication = { odd: 'Who will Win the Match?' };

  const premiumData = [
    {
      slice1: [{ text: 'Premium 1' }, { text: 'Premium 2' }],
    },
    {
      slice2: [
        { text: 'Premium 1' },
        { text: 'Premium 2' },
        { text: 'Premium 3' },
        { text: 'Premium 4' },
        { text: 'Premium 5' },
      ],
    },
  ];

  const sessionsData = [
    {
      name: '10 Over Runs SL Adv',
      no: '46',
      yes: '48',
      min: '100',
      max: '25000',
    },
    {
      name: '10 Over Runs AUS Adv',
      no: '54',
      yes: '56',
      min: '100',
      max: '25000',
    },
    {
      name: '50 Over Runs SL Adv',
      no: '245',
      yes: '249',
      min: '100',
      max: '25000',
    },
    {
      name: '50 Over Runs AUS Adv',
      no: '264',
      yes: '268',
      min: '100',
      max: '25000',
    },
  ];
  const sessionsDataXtra = [
    {
      name: '10 Over Runs SL Adv',
      no: '46',
      yes: '48',
      min: '100',
      max: '25000',
    },
    {
      name: '10 Over Runs AUS Adv',
      no: '54',
      yes: '56',
      min: '100',
      max: '25000',
    },
    {
      name: '50 Over Runs SL Adv',
      no: '245',
      yes: '249',
      min: '100',
      max: '25000',
    },
    {
      name: '50 Over Runs AUS Adv',
      no: '264',
      yes: '268',
      min: '100',
      max: '25000',
    },
    {
      name: '10 Over Runs SL Adv',
      no: '46',
      yes: '48',
      min: '100',
      max: '25000',
    },
    {
      name: '10 Over Runs AUS Adv',
      no: '54',
      yes: '56',
      min: '100',
      max: '25000',
    },
    {
      name: '50 Over Runs SL Adv',
      no: '245',
      yes: '249',
      min: '100',
      max: '25000',
    },
    {
      name: '50 Over Runs AUS Adv',
      no: '264',
      yes: '268',
      min: '100',
      max: '25000',
    },
  ];
  console.log(oddsData, 'hgvgf');

  const dateTime = dayjs(oddsData?.matchDateTime).format(
    'MMMM DD YYYY - hh:mm:a',
  );
  return (
    <div className="flex w-full">
      <div className="w-[70%] pt-2 ml-1">
        <div className="space-y-4">
          <TopComponent game={oddsData?.name} dateTime={dateTime} />

          <div className="space-y-2">
            <MatchOdd game="Match Odds" cashout="CashOut" />

            <MatchOddsCricket
              heading="MATCH ODDS"
              data={oddsData}
              competition_name={matchData?.competition_name}
              placedBetWinLossDatas={placedBetWinLossDatas}
            />
          </div>

          <div className="space-y-2">
            <MatchOdd game="Bookmakers" cashout="CashOut" />
            {/* <BettingOdds minValue={100} maxValue={2000} matchData={matchData} /> */}
            <BookmakersCricket
              heading="BOOKMAKERS"
              data={{
                ...bookmakerTransformData,
                market_id: oddsData?.market_id,
                noData: bookmakerData ? false : true,
              }}
              competition_name={matchData?.competition_name}
              placedBetWinLossBookmakerData={placedBetWinLossBookmakerData}
              oddsData={oddsData}
              matchName={matchData?.name}
            />
          </div>

          <div className="space-y-2">
            <MatchOdd game="Sessions" cashout="CashOut" />
            {/* <BettingOdds minValue={100} maxValue={2000} matchData={matchData} /> */}
            <SessionsCricket
              sessionBooksetClcuData={sessionBooksetClcuData}
              data={sessionData}
              matchName={matchData?.name}
              particularMatchData={particularMatchData}
              competition_name={matchData?.competition_name}
              oddsData={oddsData}
            />
          </div>

          <div className="space-y-2">
            <MatchOdd game={gamePredication.odd} />
            <Prediction
              minValue={0}
              maxValue={1}
              matchData={matchData}
              data1="55"
              data2="45"
            />
          </div>

          {/* Premium Section */}
          <Premium premiumData={premiumData} />
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <MatchOdd game="sessions" />
              <Sessions sessions={sessionsData} />
            </div>
            <div className="space-y-2">
              <MatchOdd game="odds/even" />
              <Sessions sessions={sessionsData} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <MatchOdd game="w/p market" />
              <Sessions sessions={sessionsDataXtra} />
            </div>
            <div className="space-y-2">
              <MatchOdd game="xtra market" />
              <Sessions sessions={sessionsData} />
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel - 40% width */}
      <div className="w-[30%] p-2">
        <div className=" w-full">
          <RightTopComponent stream="Live Match" live="live stream started" />
        </div>
        <div className=" w-full mt-2">
          <RightTopComponent stream="Place Bet" />
        </div>
        <div className=" w-full mt-2">
          <RightTopComponent stream="My Bet" />
        </div>
      </div>
    </div>
  );
};

export default CricketMarket;
