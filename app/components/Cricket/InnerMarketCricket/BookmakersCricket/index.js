import React from 'react';
import BettingOdds from '../../BettingOdds';
import PropTypes from 'prop-types';

const BookmakersCricket = ({ data }) => {
  return (
    <div>
      <BettingOdds
        minValue={100}
        maxValue={2000}
        matchData={data['0']?.runners}
      />
    </div>
  );
};

BookmakersCricket.propTypes = {
  data: PropTypes.array,
};

export default BookmakersCricket;
