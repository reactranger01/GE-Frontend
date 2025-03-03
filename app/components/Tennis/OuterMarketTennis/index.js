import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchBetDetailsAction } from '@/redux/actions';
import { setActiveBetSlipIndex } from '@/redux/Slices/newBetSlice';
import OuterOdds from '@/components/OuterOdds';
const OuterMarketTennis = ({ data }) => {
  const dispatch = useDispatch();
  const addToBetPlace = (
    competition_name,
    eventId,
    selectionId,
    betDetails,
    game,
    OddsPrice,
    betType,
    selectType,
    name,
    market_id,
    _marketData,
    sportId,
    minBetLimit,
    maxBetLimit,
  ) => {
    // Create the bet object
    const bet = {
      marketId: String(market_id),
      eventId: Number(eventId),
      gameId: Number(sportId),
      selectionId: String(selectionId),
      betOn: selectType,
      price: parseFloat(OddsPrice),
      stake: '',
      eventType: game,
      competition: competition_name,
      event: name,
      market: betType,
      gameType: betType,
      nation: betDetails?.runnerName,
      type: selectType,
      calcFact: 0,
      bettingOn: betType,
      runners: 2,
      row: 1,
      matchName: name,
      percent: 100,
      selection: betDetails?.runnerName,
      _marketData,
      minimumBet: minBetLimit,
      maximumBet: maxBetLimit,
    };

    dispatch(fetchBetDetailsAction([bet]));
    dispatch(setActiveBetSlipIndex(eventId));
  };
  return (
    <>
      {data &&
        data?.map((_items, index) => {
          let minLimitOdds, maxLimitOdds;
          if (_items.inplay) {
            minLimitOdds = _items?.inPlayMinLimit;
            maxLimitOdds = _items?.inPlayMaxLimit;
          } else {
            minLimitOdds = _items?.offPlayMinLimit;
            maxLimitOdds = _items?.offPlayMaxLimit;
          }
          return (
            <>
              <OuterOdds
                data={_items}
                key={index}
                sport={'tennis'}
                addToBetPlace={addToBetPlace}
                minLimitOdds={minLimitOdds}
                maxLimitOdds={maxLimitOdds}
              />
            </>
          );
        })}
    </>
  );
};
OuterMarketTennis.propTypes = {
  data: PropTypes.array.isRequired,
};
export default OuterMarketTennis;
