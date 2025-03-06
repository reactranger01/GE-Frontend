import React from 'react';
import PropTypes from 'prop-types';
import BettingOdds from '@/components/Cricket/BettingOdds';

const MatchOddsTennis = ({ data }) => {
  return (
    <div>
      <BettingOdds minValue={100} maxValue={2000} matchData={data?.runners} />
    </div>
  );
};

MatchOddsTennis.propTypes = {
  data: PropTypes.array,
};

export default MatchOddsTennis;
