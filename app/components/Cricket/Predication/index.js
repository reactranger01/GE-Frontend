import React from 'react';
import PropTypes from 'prop-types';

const Prediction = ({ minValue, maxValue, matchData, data1, data2 }) => {
  if (!matchData || matchData.length < 2) {
    return <div>No match data available</div>;
  }

  return (
    <div className="w-full mx-auto p-2 bg-gray-100">
      {/* Min and Max Values (Evenly Spaced) */}
      <div className="flex justify-start gap-1 text-cyan-500 font-semibold text-sm mb-2">
        <span>Min: {minValue}</span>
        <span>Max: {maxValue}</span>
      </div>

      {/* Teams Section (Centered) */}
      <div className="flex justify-evenly items-center gap-10 text-[#000000ff]text-xl font-bold">
        <span className="text-[#000000ff]">{matchData[0].name}</span>
        <span className="text-[#000000ff]">{matchData[1].name}</span>
      </div>

      {/* Data Section (Centered) */}
      <div className="flex justify-evenly items-center gap-10 mt-2">
        <div className="bg-[#73bcf0ff] text-[#000000ff] p-2 rounded-lg text-center w-60">
          {data1}
        </div>
        <div className="bg-[#73bcf0ff] text-[#000000ff] p-2 rounded-lg text-center w-60">
          {data2}
        </div>
      </div>
    </div>
  );
};

Prediction.propTypes = {
  minValue: PropTypes.string.isRequired,
  maxValue: PropTypes.string.isRequired,
  matchData: PropTypes.arrayOf(PropTypes.object).isRequired,
  data1: PropTypes.string.isRequired,
  data2: PropTypes.string.isRequired,
};

export default Prediction;
