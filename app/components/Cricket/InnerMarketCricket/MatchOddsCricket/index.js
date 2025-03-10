import React from 'react';
import BettingOdds from '../../BettingOdds';
import PropTypes from 'prop-types';
import { isLoggedIn } from '@/utils/apiHandlers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import MatchOdd from '../../MatchOdd';

const MatchOddsCricket = ({ data }) => {
  const isLogin = isLoggedIn();
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

  const addToBetPlace = (selectionId, runnerName, OddsPrice, selectType) => {
    if (isLogin) {
      const bet = {
        marketId: String(data?.market_id),
        eventId: Number(data?.event_id || data?.matchId),
        gameId: Number(data?.sportId),
        selectionId: String(selectionId),
        nation: runnerName,
        betOn: selectType,
        selection: runnerName,
        price: parseFloat(OddsPrice),
        stake: '',
        eventType: 'Cricket',
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
    <>
      <MatchOdd game="Match Odds" cashout="CashOut" />
      <div>
        <BettingOdds
          minValue={minLimitOdds}
          maxValue={maxLimitOdds}
          matchData={data?.runners}
          addToBetPlace={addToBetPlace}
        />
      </div>
    </>
  );
};

MatchOddsCricket.propTypes = {
  data: PropTypes.array,
};

export default MatchOddsCricket;
