import { BiTrophy } from 'react-icons/bi';
import { MdSportsCricket } from 'react-icons/md';
import React from 'react';
import PropTypes from 'prop-types';

const BettingOdds = ({ minValue, maxValue, matchData, addToBetPlace }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid md:grid-cols-10 grid-cols-9 md:gap-0.5">
        <div className="col-span-2 md:col-span-1 text-[#000000ff] font-bold text-12  md:text-cyan-500 md:font-semibold md:text-center md:text-sm md:mt-1">
          Min: {minValue}
        </div>
        <div className="col-span-2 md:col-span-1 text-[#000000ff] font-bold text-12  md:text-cyan-500 md:font-semibold md:text-center md:text-sm md:mt-1">
          Max: {maxValue}
        </div>
        <div className=" md:col-span-4 col-span-1"></div>
        <div className="col-span-1">
          <div className="bg-[#73bcf0ff] text-12 md:text-14 text-center md:py-1 font-bold text-[#000000ff]">
            BACK
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-[#faaabbff] text-12 md:text-14 text-center md:py-1 font-bold text-[#000000ff]">
            LAY
          </div>
        </div>
        {/* Match Data */}
        {matchData?.map((team, index) => (
          <React.Fragment key={index}>
            <div
              className={`md:col-span-4 col-span-3 md:max-w-none py-1 px-2 border-y border-[#aaa] md:border-none ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
              }`}
            >
              <span className="text-[#000000ff] font-bold text-12 md:text-14 capitalize">
                {team?.runnerName || team?.RunnerName}
              </span>
            </div>
            {/* 1 backPrice3 */}
            <button
              onClick={async () => {
                await addToBetPlace(
                  team?.selectionId || team?.SelectionId,
                  team?.runnerName || team?.RunnerName,
                  team?.backPrice3 || team?.BackPrice3,
                  'BACK',
                );
              }}
              className="bg-[#73bcf0ff]  flex-center flex-col border border-[#aaa] md:border-none "
            >
              <div className="text-center font-bold text-[#000000ff]">
                {team?.backPrice3 || team?.BackPrice3 || '-'}
              </div>
              <div className="text-center md:text-sm text-12 text-[#000000]">
                {team?.backsize3 || team?.backSize3 || team?.BackSize3 || 0}
              </div>
            </button>
            {/* 2 backPrice2 */}
            <button
              onClick={async () => {
                await addToBetPlace(
                  team?.selectionId || team?.SelectionId,
                  team?.runnerName || team?.RunnerName,
                  team?.backPrice2 || team?.BackPrice2,
                  'BACK',
                );
              }}
              className="bg-[#73bcf0ff] flex-center flex-col border border-[#aaa] md:border-none"
            >
              <div className="text-center font-bold text-[#000000ff]">
                {team?.backPrice2 || team?.BackPrice2 || '-'}
              </div>

              <div className="text-center text-sm text-[#000000]">
                {team?.backsize2 || team?.backSize2 || team?.BackSize2 || 0}
              </div>
            </button>
            {/* 3 backPrice1 */}
            <button
              onClick={async () => {
                await addToBetPlace(
                  team?.selectionId || team?.SelectionId,
                  team?.runnerName || team?.RunnerName,

                  team?.backPrice1 || team?.BackPrice1,
                  'BACK',
                );
              }}
              className="bg-[#73bcf0ff] flex-center flex-col border border-[#aaa] md:border-none"
            >
              <div className="text-center font-bold text-[#000000ff]">
                {team?.backPrice1 || team?.BackPrice1 || '-'}
              </div>

              <div className="text-center md:text-sm text-12 text-[#000000]">
                {team?.backsize1 || team?.backSize1 || team?.BackSize1 || 0}
              </div>
            </button>

            {/* 1 layPrice1 */}
            <button
              onClick={async () => {
                await addToBetPlace(
                  team?.selectionId || team?.SelectionId,
                  team?.runnerName || team?.RunnerName,

                  team?.layPrice1 || team?.LayPrice1,
                  'LAY',
                );
              }}
              className="bg-[#faaabbff] flex-center flex-col border border-[#aaa] md:border-none"
            >
              <div className="text-center font-bold text-[#000000ff]">
                {team?.layPrice1 || team?.LayPrice1 || '-'}
              </div>
              <div className="text-center md:text-sm text-12 text-[#000000]">
                {team?.laysize1 || team?.laySize1 || team?.LaySize1 || 0}
              </div>
            </button>
            {/* 2 layPrice2 */}
            <button
              onClick={async () => {
                await addToBetPlace(
                  team?.selectionId || team?.SelectionId,
                  team?.runnerName || team?.RunnerName,

                  team?.layPrice2 || team?.LayPrice2,
                  'LAY',
                );
              }}
              className="bg-[#faaabbff] flex-center flex-col border border-[#aaa] md:border-none"
            >
              <div className="text-center font-bold text-[#000000ff]">
                {team?.layPrice2 || team?.LayPrice2 || '-'}
              </div>
              <div className="text-center md:text-sm text-12 text-[#000000]">
                {team?.laysize2 || team?.laySize2 || team?.LaySize2 || 0}
              </div>
            </button>
            {/* 3 layPrice3 */}
            <button
              onClick={async () => {
                await addToBetPlace(
                  team?.selectionId || team?.SelectionId,
                  team?.runnerName || team?.RunnerName,

                  team?.layPrice3 || team?.LayPrice3,
                  'LAY',
                );
              }}
              className="bg-[#faaabbff] flex-center flex-col border border-[#aaa] md:border-none"
            >
              <div className="text-center font-bold text-[#000000ff]">
                {team?.layPrice3 || team?.LayPrice3 || '-'}
              </div>

              <div className="text-center md:text-sm text-12 text-[#000000]">
                {team?.laysize3 || team?.laySize3 || team?.LaySize3 || 0}
              </div>
            </button>
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
  matchData: PropTypes.array,
  addToBetPlace: PropTypes.func,
};

export default BettingOdds;
