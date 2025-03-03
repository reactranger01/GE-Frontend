import PropTypes from 'prop-types';
import React from 'react';
import SportIcon from '../Common/SportIcon';
import DateFormatter from '../DateFormatter';
import { isLoggedIn } from '@/utils/apiHandlers';
import DisableButton from '../DisableButton';
import { useNavigate } from 'react-router-dom';
import FeatureIcons from '../Common/FeatureIcons';

const OuterOdds = ({
  data,
  sport,
  addToBetPlace,
  minLimitOdds,
  maxLimitOdds,
}) => {
  const isLogin = isLoggedIn();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-15 gap-0 border-t items-center">
      {/* Game Info - 8 columns */}
      <div className="col-span-8 px-4 py-2">
        <div className="flex items-center  text-black">
          <div className="flex-shrink-0">
            <SportIcon sport={sport} />
          </div>
          <div className="flex items-center gap-4 hover:underline cursor-pointer">
            <div className="font-medium truncate text-black">
              {data?.runners?.[0]?.runnerName || ''} V{' '}
              {data?.runners?.[1]?.runnerName || ''}
            </div>
            <div className="text-sm text-black whitespace-nowrap">
              <DateFormatter dateTime={data?.matchDateTime} />
            </div>
          </div>
        </div>
      </div>

      {/* Features - 1 column */}
      <div className="col-span-1 text-black">
        <FeatureIcons features={data} />
      </div>

      <div className="col-span-2 grid grid-cols-2 h-full cursor-pointer">
        {data?.runners?.[0]?.backPrice1 ? (
          <button
            className="bg-[#73bcf0] px-4 py-2 text-center text-black"
            onClick={() => {
              if (isLogin) {
                addToBetPlace(
                  data?.competition_name,
                  data?.event_id || data?.matchId,
                  data?.runners?.[0]?.selectionId,
                  data?.runners?.[0],
                  'Cricket',
                  data?.runners?.[0]?.backPrice1,
                  data?.market_name,
                  'BACK',
                  data?.name,
                  data?.market_id,
                  data?.runners,
                  data?.sportId,
                  minLimitOdds,
                  maxLimitOdds,
                );
              } else {
                navigate('/login');
              }
            }}
          >
            {data?.runners?.[0]?.backPrice1 || '-'}
          </button>
        ) : (
          <DisableButton btncolor={'blue'} />
        )}
        {data?.runners?.[0]?.layPrice1 ? (
          <button
            className="bg-[#faaabb] px-4 py-2 text-center text-black"
            onClick={() => {
              isLogin
                ? addToBetPlace(
                    data?.competition_name,
                    data?.event_id || data?.matchId,
                    data?.runners?.[0]?.selectionId,
                    data?.runners?.[0],
                    'Cricket',
                    data?.runners?.[0]?.layPrice1,
                    data?.market_name,
                    'LAY',
                    data?.name,
                    data?.market_id,
                    data?.runners,
                    data?.sportId,
                    minLimitOdds,
                    maxLimitOdds,
                  )
                : navigate('/login');
            }}
          >
            {data?.runners?.[0]?.layPrice1 || '-'}
          </button>
        ) : (
          <DisableButton btncolor={'pink'} />
        )}
      </div>
      <div className="col-span-2 grid grid-cols-2 cursor-pointer h-full">
        {data?.runners?.[2]?.backPrice1 ? (
          <button
            className="bg-[#73bcf0] px-4 py-2 text-center text-black"
            onClick={() => {
              isLogin
                ? addToBetPlace(
                    data?.competition_name,
                    data?.event_id || data?.matchId,
                    data?.runners?.[2]?.selectionId,
                    data?.runners?.[2],
                    'Cricket',
                    data?.runners?.[2]?.backPrice1,
                    data?.market_name,
                    'BACK',
                    data?.name,
                    data?.market_id,
                    data?.runners,
                    data?.sportId,
                    minLimitOdds,
                    maxLimitOdds,
                  )
                : navigate('/login');
            }}
          >
            {data?.runners?.[2]?.backPrice1 || '-'}
          </button>
        ) : (
          <DisableButton btncolor={'blue'} />
        )}
        {data?.runners?.[2]?.layPrice1 ? (
          <button
            className="bg-[#faaabb] px-4 py-2 text-center text-black"
            onClick={() => {
              isLogin
                ? addToBetPlace(
                    data?.competition_name,
                    data?.event_id || data?.matchId,
                    data?.runners?.[2]?.selectionId,
                    data?.runners?.[2],
                    'Cricket',
                    data?.runners?.[2]?.layPrice1,
                    data?.market_name,
                    'LAY',
                    data?.name,
                    data?.market_id,
                    data?.runners,
                    data?.sportId,
                    minLimitOdds,
                    maxLimitOdds,
                  )
                : navigate('/login');
            }}
          >
            {data?.runners?.[2]?.layPrice1 || '-'}
          </button>
        ) : (
          <DisableButton btncolor={'pink'} />
        )}
      </div>
      <div className="col-span-2 grid grid-cols-2 cursor-pointer h-full">
        {data?.runners?.[1]?.backPrice1 ? (
          <button
            className="bg-[#73bcf0] px-4 py-2 text-center text-black"
            onClick={() => {
              isLogin
                ? addToBetPlace(
                    data?.competition_name,
                    data?.event_id || data?.matchId,
                    data?.runners?.[1]?.selectionId,
                    data?.runners?.[1],
                    'Cricket',
                    data?.runners?.[1]?.backPrice1,
                    data?.market_name,
                    'BACK',
                    data?.name,
                    data?.market_id,
                    data?.runners,
                    data?.sportId,
                    minLimitOdds,
                    maxLimitOdds,
                  )
                : navigate('/login');
            }}
          >
            {data?.runners?.[1]?.backPrice1 || '-'}
          </button>
        ) : (
          <DisableButton btncolor={'blue'} />
        )}
        {data?.runners?.[1]?.layPrice1 ? (
          <button
            className="bg-[#faaabb] px-4 py-2 text-center text-black"
            onClick={() => {
              isLogin
                ? addToBetPlace(
                    data?.competition_name,
                    data?.event_id || data?.matchId,
                    data?.runners?.[1]?.selectionId,
                    data?.runners?.[1],
                    'Cricket',
                    data?.runners?.[1]?.layPrice1,
                    data?.market_name,
                    'LAY',
                    data?.name,
                    data?.market_id,
                    data?.runners,
                    data?.sportId,
                    minLimitOdds,
                    maxLimitOdds,
                  )
                : navigate('/login');
            }}
          >
            {data?.runners?.[1]?.layPrice1 || '-'}
          </button>
        ) : (
          <DisableButton btncolor={'pink'} />
        )}
      </div>
    </div>
  );
};
OuterOdds.propTypes = {
  data: PropTypes.array,
  sport: PropTypes.string,
  addToBetPlace: PropTypes.func,
  minLimitOdds: PropTypes.string,
  maxLimitOdds: PropTypes.string,
};
export default OuterOdds;
