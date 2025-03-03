import React from 'react';
import BettingOdds from '@/components/Cricket/BettingOdds';
import MatchOdd from '@/components/Cricket/MatchOdd';
import Prediction from '@/components/Cricket/Predication';
import Premium from '@/components/Cricket/Premium';
import TopComponent from '@/components/Cricket/TopComponent';
import Sessions from '@/components/Cricket/Sessions';
import RightTopComponent from '@/components/Cricket/RightTopComponent';

const CricketMarket = () => {
  const gameInfo = {
    game: 'India vs Australia',
    dateTime: 'March 20, 2025 - 7:00 PM',
  };

  const gameOdds = { odd: 'Match Odds' };
  const gameToss = { odd: 'Toss' };
  const gameBookmaker = { odd: 'BOOKMAKER' };
  const gamePredication = { odd: 'Who will Win the Match?' };

  const matchData = [
    {
      name: 'Pakistan',
      backOdds: [
        { value: '2.62', stakes: '16462.2' },
        { value: '2.64', stakes: '7.66' },
        { value: '2.66', stakes: '2964.14' },
      ],
      layOdds: [
        { value: '2.7', stakes: '1732.44' },
        { value: '2.74', stakes: '9.45' },
        { value: '2.76', stakes: '3396.21' },
      ],
    },
    {
      name: 'South Africa',
      backOdds: [
        { value: '1.56', stakes: '146.73' },
        { value: '1.57', stakes: '5841.12' },
        { value: '1.59', stakes: '2941.87' },
      ],
      layOdds: [
        { value: '1.6', stakes: '4803.17' },
        { value: '1.61', stakes: '16741.52' },
        { value: '1.62', stakes: '10157.64' },
      ],
    },
  ];

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

  return (
    <div className="flex w-full">
      {/* Main Content - 60% width */}
      <div className="w-[70%] pt-2 ml-1">
        <div className="space-y-4">
          <TopComponent game={gameInfo.game} dateTime={gameInfo.dateTime} />

          {/* Match Odds Section */}
          <div className="space-y-2">
            <MatchOdd game={gameOdds.odd} cashout="CashOut" />
            <BettingOdds minValue={100} maxValue={2000} matchData={matchData} />
          </div>

          {/* Bookmaker Section */}
          <div className="space-y-2">
            <MatchOdd game={gameBookmaker.odd} cashout="CashOut" />
            <BettingOdds minValue={100} maxValue={2000} matchData={matchData} />
          </div>

          {/* Toss Section */}
          <div className="space-y-2">
            <MatchOdd game={gameToss.odd} cashout="CashOut" />
            <BettingOdds minValue={100} maxValue={2000} matchData={matchData} />
          </div>

          {/* Prediction Section */}
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
