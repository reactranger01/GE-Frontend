import React from 'react';
import BettingOdds from '../../BettingOdds';
import PropTypes from 'prop-types';

const MatchOddsCricket = ({ data }) => {
  return (
    <div>
      <BettingOdds minValue={100} maxValue={2000} matchData={data?.runners} />
    </div>
  );
};

MatchOddsCricket.propTypes = {
  data: PropTypes.array,
};

export default MatchOddsCricket;
