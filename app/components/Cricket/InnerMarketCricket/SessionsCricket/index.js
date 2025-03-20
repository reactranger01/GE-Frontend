import React from 'react';
import BettingOdds from '../../BettingOdds';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import { fetchBetDetailsAction } from '@/redux/actions';

const SessionsCricket = ({ data, matchDetails }) => {
  const dispatch = useDispatch();
  const inplay = data?.inplay;
  let minLimitOdds, maxLimitOdds;
  if (inplay) {
    minLimitOdds = matchDetails?.inPlayFancyMinLimit;
    maxLimitOdds = matchDetails?.inPlayFancyMaxLimit;
  } else {
    minLimitOdds = matchDetails?.offPlayFancyMinLimit;
    maxLimitOdds = matchDetails?.offPlayFancyMaxLimit;
  }
  const addToBetPlace = async (
    selectionId,
    runnerName,
    OddsPrice,
    selectType,
  ) => {
    dispatch(
      fetchBetDetailsAction([
        {
          marketId: String(matchDetails?.market_id),
          eventId: Number(matchDetails?.event_id || matchDetails?.matchId),
          gameId: Number(matchDetails?.sportId),
          selectionId: String(selectionId),
          betOn: selectType,
          price: parseFloat(OddsPrice),
          stake: '',
          eventType: 'Cricket',
          competition: matchDetails?.competition_name,
          event: matchDetails?.name,
          market: data?.market,
          gameType: data?.market,
          nation: runnerName,
          type: selectType,
          runners: 2,
          row: 1,
          calcFact: data?.market === 'fancy' ? 0 : 1,
          bettingOn: data?.market,
          matchName: matchDetails?.name,
          percent: 100,
          selection: runnerName,
          minimumBet: minLimitOdds || '',
          maximumBet: maxLimitOdds || '',
          _marketData: data,
        },
      ]),
    );
    dispatch(setActiveBetSlipIndex(Number(selectionId)));
  };

  return (
    <div>
      <BettingOdds
        minValue={minLimitOdds}
        maxValue={maxLimitOdds}
        matchData={data?.catalogue?.[0]?.runners}
        addToBetPlace={addToBetPlace}
      />
    </div>
  );
};

SessionsCricket.propTypes = {
  data: PropTypes.array,
  matchDetails: PropTypes.object,
};

export default SessionsCricket;
