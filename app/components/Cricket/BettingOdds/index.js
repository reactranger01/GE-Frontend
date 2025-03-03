import { BiTrophy } from 'react-icons/bi';
import { MdSportsCricket } from 'react-icons/md';
import React from 'react';
import PropTypes from 'prop-types';

const BettingOdds = ({ minValue, maxValue, matchData }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Grid Container */}
      <div className="grid grid-cols-10 gap-0.5">
        {/* Headers with Min/Max */}
        <div className="text-cyan-500 font-semibold text-center text-sm mt-1">
          Min: {minValue}
        </div>
        <div className="text-cyan-500 font-semibold text-center text-sm mt-1">
          Max: {maxValue}
        </div>
        <div className="col-span-4 "></div> {/* Empty space for team names */}
        <div className="col-span-1">
          <div className="bg-[#73bcf0ff] text-center py-1 font-bold text-[#000000ff]">
            BACK
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-[#faaabbff] text-center py-1 font-bold text-[#000000ff]">
            LAY
          </div>
        </div>
        {/* Match Data */}
        {matchData.map((team, index) => (
          <React.Fragment key={team.name}>
            {/* Team Name */}
            <div
              className={`col-span-4 py-1 px-2 ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
              }`}
            >
              <span className="text-[#000000ff] font-bold">{team.name}</span>
            </div>

            {/* Back Odds */}
            {team.backOdds.map((odd, i) => (
              <div key={`back-${i}`} className="bg-[#73bcf0ff] p-2 pt-0">
                <div className="text-center font-bold text-[#000000ff]">
                  {odd.value}
                </div>
                <div className="text-center text-sm text-[#000000]">
                  {odd.stakes}
                </div>
              </div>
            ))}

            {/* Lay Odds */}
            {team.layOdds.map((odd, i) => (
              <div key={`lay-${i}`} className="bg-[#faaabbff] p-2 pt-0">
                <div className="text-center font-bold text-[#000000ff]">
                  {odd.value}
                </div>
                <div className="text-center text-sm text-[#000000]">
                  {odd.stakes}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      {/* Marquee Footer */}
      <div className="w-full overflow-hidden bg-white mt-2">
        <marquee className="flex items-center space-x-2 font-bold text-red-900">
          <span className="inline-flex items-center">
            <MdSportsCricket className="inline mr-2" />
            THE HIGHEST ODDS ALLOWED FOR OUR EXCHANGE
            <BiTrophy className="inline mx-2" />
            Bets Started
            <MdSportsCricket className="inline ml-2" />
          </span>
        </marquee>
      </div>
    </div>
  );
};

BettingOdds.propTypes = {
  minValue: PropTypes.string.isRequired,
  maxValue: PropTypes.string.isRequired,
  matchData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      backOdds: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          stakes: PropTypes.string.isRequired,
        }),
      ).isRequired,
      layOdds: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          stakes: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default BettingOdds;
