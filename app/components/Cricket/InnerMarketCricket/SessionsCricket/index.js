import React from 'react';
import BettingOdds from '../../BettingOdds';
import PropTypes from 'prop-types';

const SessionsCricket = ({ data }) => {
  return (
    <div>
      <BettingOdds
        minValue={100}
        maxValue={2000}
        matchData={data?.catalogue?.[0]?.runners}
      />
    </div>
  );
};

SessionsCricket.propTypes = {
  data: PropTypes.array,
};

export default SessionsCricket;
