import React from 'react';
import BettingOdds from '../../BettingOdds';
import PropTypes from 'prop-types';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';

const BookmakersCricket = ({ data, matchDetails }) => {
  const isLogin = isLoggedIn();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inplay = data?.inplay;
  const bookmakerData = data?.[0];
  let minLimitOdds, maxLimitOdds;
  if (inplay) {
    minLimitOdds = matchDetails?.inPlayBookMinLimit;
    maxLimitOdds = matchDetails?.inPlayBookMaxLimit;
  } else {
    minLimitOdds = matchDetails?.offPlayBookMinLimit;
    maxLimitOdds = matchDetails?.offPlayBookMaxLimit;
  }
  const addToBetPlace = (selectionId, runnerName, OddsPrice, selectType) => {
    if (isLogin) {
      if (OddsPrice > 1) {
        const bet = {
          marketId: String(matchDetails?.market_id),
          eventId: Number(matchDetails?.event_id || matchDetails?.matchId),
          gameId: 4,
          selectionId: String(selectionId),
          betOn: selectType,
          price: parseFloat(OddsPrice),
          stake: '',
          eventType: 'Cricket',
          competition: matchDetails?.competition_name,
          event: matchDetails?.name,
          market: data?.[0]?.marketName,
          gameType: data?.[0]?.marketName,
          nation: runnerName,
          type: selectType,
          calcFact: 0,
          bettingOn: data?.[0]?.marketName,
          runners: 2,
          row: 1,
          matchName: matchDetails?.name,
          percent: 100,
          selection: runnerName,
          minimumBet: minLimitOdds,
          maximumBet: maxLimitOdds,
          bookmakerData,
        };

        dispatch(fetchBetDetailsAction([bet]));
        dispatch(setActiveBetSlipIndex(selectionId));
      } else {
        navigate('/login');
      }
    } else {
      toast.error('Market not available');
    }
  };
  return (
    <div>
      <BettingOdds
        matchData={data['0']?.runners}
        minValue={minLimitOdds}
        maxValue={maxLimitOdds}
        addToBetPlace={addToBetPlace}
      />
    </div>
  );
};

BookmakersCricket.propTypes = {
  data: PropTypes.array,
  matchDetails: PropTypes.object,
};

export default BookmakersCricket;
