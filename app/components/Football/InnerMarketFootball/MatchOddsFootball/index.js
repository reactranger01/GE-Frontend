import React from 'react';
import PropTypes from 'prop-types';
import BettingOdds from '@/components/Cricket/BettingOdds';
import { useDispatch } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { useNavigate } from 'react-router-dom';
// import { isLoggedIn } from '@/utils/apiHandlers';

const MatchOddsFootball = ({ data }) => {
  // const isLogin = isLoggedIn();
  const isLogin = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inplay = data?.inplay;
  let minLimitOdds, maxLimitOdds;
  if (inplay) {
    minLimitOdds = data?.inPlayMinLimit;
    maxLimitOdds = data?.inPlayMaxLimit;
  } else {
    minLimitOdds = data?.offPlayMinLimit;
    maxLimitOdds = data?.offPlayMaxLimit;
  }
  // const ddss = {
  //   matchId: '34095532',
  //   sportId: '1',
  //   seriesId: '12081663',
  //   name: 'Al Budaiya v Isa Town FC',
  //   matchDateTime: '2025-03-06T18:30:00.000Z',
  //   inPlayBookMaxLimit: '100000',
  //   inPlayBookMinLimit: '100',
  //   inPlayFancyMaxLimit: '100000',
  //   inPlayFancyMinLimit: '100',
  //   inPlayMaxLimit: '100000',
  //   inPlayMinLimit: '100',
  //   offPlayBookMaxLimit: '25000',
  //   offPlayBookMinLimit: '100',
  //   offPlayFancyMaxLimit: '25000',
  //   offPlayFancyMinLimit: '100',
  //   offPlayMaxLimit: '25000',
  //   offPlayMinLimit: '100',
  //   isBookMaker: false,
  //   isFancy: false,
  //   isT10: false,
  //   isDelete: false,
  //   inPlay: true,
  //   competition_name: 'Bahraini 2nd Division',
  //   isSubscribed: true,
  //   market_id: '1.240463119',
  //   market_name: 'Match Odds',
  //   market_start_time: '2025-03-06T18:30:00.000Z',
  //   total_matched: '17.11',
  //   odds_type: null,
  //   event_id: '34095532',
  //   sport_id: '1',
  //   runners: [
  //     {
  //       handicap: 0,
  //       metadata: {
  //         runnerId: '8147126',
  //       },
  //       runnerName: 'Al Budaiya',
  //       selectionId: 8147126,
  //       sortPriority: 1,
  //       lastPriceTraded: 32,
  //       totalMatched: 1480.93,
  //       back: [
  //         {
  //           price: 32,
  //           size: 2.56,
  //         },
  //         {
  //           price: 30,
  //           size: 4,
  //         },
  //         {
  //           price: 1.02,
  //           size: 2,
  //         },
  //       ],
  //       lay: [
  //         {
  //           price: 280,
  //           size: 3.35,
  //         },
  //         {
  //           price: 290,
  //           size: 3.15,
  //         },
  //         {
  //           price: 840,
  //           size: 0.84,
  //         },
  //       ],
  //       status: 'ACTIVE',
  //       marketName: 'Match Odds',
  //       backPrice1: 32,
  //       backPrice2: 30,
  //       backPrice3: 1.02,
  //       layPrice1: 280,
  //       layPrice2: 290,
  //       layPrice3: 840,
  //       backsize1: 2.56,
  //       backsize2: 4,
  //       backsize3: 2,
  //       laysize1: 3.35,
  //       laysize2: 3.15,
  //       laysize3: 0.84,
  //     },
  //     {
  //       handicap: 0,
  //       metadata: {
  //         runnerId: '8149479',
  //       },
  //       runnerName: 'Isa Town FC',
  //       selectionId: 8149479,
  //       sortPriority: 2,
  //       lastPriceTraded: 24,
  //       totalMatched: 523.87,
  //       back: [
  //         {
  //           price: 24,
  //           size: 1.63,
  //         },
  //         {
  //           price: 23,
  //           size: 4,
  //         },
  //         {
  //           price: 14.5,
  //           size: 0.23,
  //         },
  //       ],
  //       lay: [
  //         {
  //           price: 290,
  //           size: 2.99,
  //         },
  //         {
  //           price: 840,
  //           size: 0.84,
  //         },
  //         {
  //           price: 860,
  //           size: 0.84,
  //         },
  //       ],
  //       status: 'ACTIVE',
  //       marketName: 'Match Odds',
  //       backPrice1: 24,
  //       backPrice2: 23,
  //       backPrice3: 14.5,
  //       layPrice1: 290,
  //       layPrice2: 840,
  //       layPrice3: 860,
  //       backsize1: 1.63,
  //       backsize2: 4,
  //       backsize3: 0.23,
  //       laysize1: 2.99,
  //       laysize2: 0.84,
  //       laysize3: 0.84,
  //     },
  //     {
  //       handicap: 0,
  //       metadata: {
  //         runnerId: '58805',
  //       },
  //       runnerName: 'The Draw',
  //       selectionId: 58805,
  //       sortPriority: 3,
  //       lastPriceTraded: 1.06,
  //       totalMatched: 4775.68,
  //       back: [
  //         {
  //           price: 1.05,
  //           size: 15.28,
  //         },
  //         {
  //           price: 1.04,
  //           size: 410.28,
  //         },
  //         {
  //           price: 1.03,
  //           size: 395.14,
  //         },
  //       ],
  //       lay: [
  //         {
  //           price: 1.06,
  //           size: 189.2,
  //         },
  //         {
  //           price: 1.07,
  //           size: 458.15,
  //         },
  //         {
  //           price: 1.08,
  //           size: 16,
  //         },
  //       ],
  //       status: 'ACTIVE',
  //       marketName: 'Match Odds',
  //       backPrice1: 1.05,
  //       backPrice2: 1.04,
  //       backPrice3: 1.03,
  //       layPrice1: 1.06,
  //       layPrice2: 1.07,
  //       layPrice3: 1.08,
  //       backsize1: 15.28,
  //       backsize2: 410.28,
  //       backsize3: 395.14,
  //       laysize1: 189.2,
  //       laysize2: 458.15,
  //       laysize3: 16,
  //     },
  //   ],
  //   inplay: true,
  //   status: 'OPEN',
  // };
  const addToBetPlace = (selectionId, runnerName, OddsPrice, selectType) => {
    if (isLogin) {
      const bet = {
        marketId: String(data?.market_id),
        eventId: Number(data?.event_id || data?.matchId),
        gameId: 1,
        selectionId: String(selectionId),
        nation: runnerName,
        betOn: selectType,
        selection: runnerName,
        price: parseFloat(OddsPrice),
        stake: '',
        eventType: 'Soccer',
        competition: data?.competition_name,
        event: data?.name,
        market: data?.market_name,
        gameType: data?.market_name,
        type: selectType,
        calcFact: 0,
        bettingOn: data?.market_name,
        runners: 2,
        row: 1,
        matchName: data?.name,
        percent: 100,
        minimumBet: minLimitOdds || '',
        maximumBet: maxLimitOdds || '',
        data,
      };
      dispatch(fetchBetDetailsAction([bet]));
      dispatch(setActiveBetSlipIndex(selectionId));
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <BettingOdds
        minValue={minLimitOdds}
        maxValue={maxLimitOdds}
        matchData={data?.runners}
        addToBetPlace={addToBetPlace}
      />
    </div>
  );
};

MatchOddsFootball.propTypes = {
  data: PropTypes.array,
};

export default MatchOddsFootball;
