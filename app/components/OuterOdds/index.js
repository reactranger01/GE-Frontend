import PropTypes from 'prop-types';
import React from 'react';
import SportIcon from '../Common/SportIcon';
import DateFormatter from '../DateFormatter';
// import { isLoggedIn } from '@/utils/apiHandlers';
import DisableButton from '../DisableButton';
import { useNavigate } from 'react-router-dom';
import FeatureIcons from '../Common/FeatureIcons';
import { useMediaQuery } from '@mui/material';

const OuterOdds = ({ data, sport }) => {
  // const isLogin = isLoggedIn();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <div className=" md:grid md:grid-cols-15 gap-0 border-t items-center">
      {isMobile ? (
        <div className="flex justify-between gap-2">
          <div className=" py-2">
            <div className="flex items-center  text-black ">
              <div className="flex-shrink-0">
                <SportIcon sport={sport} />
              </div>
              <div className="  hover:underline cursor-pointer">
                <div
                  onClick={() => navigate(`/${sport}-market/${data?.event_id}`)}
                  className="font-semibold text-14 truncate text-black"
                >
                  {data?.runners?.[0]?.runnerName || ''} V{' '}
                  {data?.runners?.[1]?.runnerName || ''}
                </div>
                <div className="text-12 text-black whitespace-nowrap">
                  <DateFormatter dateTime={data?.matchDateTime} />
                </div>
              </div>
            </div>
          </div>
          <div className=" text-black flex">
            <FeatureIcons features={data} />
          </div>
        </div>
      ) : (
        <div className="col-span-9 grid grid-cols-9">
          <div className="col-span-8 px-4 ">
            <div className="flex items-center  text-black">
              <div className="flex-shrink-0">
                <SportIcon sport={sport} />
              </div>
              <div className="flex items-center gap-1 hover:underline cursor-pointer">
                <div
                  onClick={() => navigate(`/${sport}-market/${data?.event_id}`)}
                  className=" truncate text-black font-roboto text-14"
                >
                  {data?.runners?.[0]?.runnerName || ''} V{' '}
                  {data?.runners?.[1]?.runnerName || ''} /
                </div>
                <div className="text-sm text-black whitespace-nowrap">
                  <DateFormatter dateTime={data?.matchDateTime} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 text-black flex items-center">
            <FeatureIcons features={data} />
          </div>
        </div>
      )}

      <div className="col-span-6 grid grid-cols-6">
        <div className="col-span-2 grid grid-cols-2 md:h-full cursor-pointer">
          {data?.runners?.[0]?.backPrice1 ? (
            <button
              className="bg-[#73bcf0] cursor-default px-4 md:py-1 h-fit md:h-auto text-center text-14 font-semibold  text-black"
              // onClick={() => {
              //   if (isLogin) {
              //     addToBetPlace(
              //       data?.competition_name,
              //       data?.event_id || data?.matchId,
              //       data?.runners?.[0]?.selectionId,
              //       data?.runners?.[0],
              //       'Cricket',
              //       data?.runners?.[0]?.backPrice1,
              //       data?.market_name,
              //       'BACK',
              //       data?.name,
              //       data?.market_id,
              //       data?.runners,
              //       data?.sportId,
              //       minLimitOdds,
              //       maxLimitOdds,
              //     );
              //   } else {
              //     navigate('/login');
              //   }
              // }}
            >
              {data?.runners?.[0]?.backPrice1 || '-'}
            </button>
          ) : (
            <DisableButton btncolor={'blue'} />
          )}
          {data?.runners?.[0]?.layPrice1 ? (
            <button
              className="bg-[#faaabb] cursor-default px-4 md:py-1 h-fit md:h-auto text-center text-14 font-semibold  text-black"
              // onClick={() => {
              //   isLogin
              //     ? addToBetPlace(
              //         data?.competition_name,
              //         data?.event_id || data?.matchId,
              //         data?.runners?.[0]?.selectionId,
              //         data?.runners?.[0],
              //         'Cricket',
              //         data?.runners?.[0]?.layPrice1,
              //         data?.market_name,
              //         'LAY',
              //         data?.name,
              //         data?.market_id,
              //         data?.runners,
              //         data?.sportId,
              //         minLimitOdds,
              //         maxLimitOdds,
              //       )
              //     : navigate('/login');
              // }}
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
              className="bg-[#73bcf0] cursor-default px-4 md:py-1 h-fit md:h-auto text-center text-14 font-semibold  text-black"
              // onClick={() => {
              //   isLogin
              //     ? addToBetPlace(
              //         data?.competition_name,
              //         data?.event_id || data?.matchId,
              //         data?.runners?.[2]?.selectionId,
              //         data?.runners?.[2],
              //         'Cricket',
              //         data?.runners?.[2]?.backPrice1,
              //         data?.market_name,
              //         'BACK',
              //         data?.name,
              //         data?.market_id,
              //         data?.runners,
              //         data?.sportId,
              //         minLimitOdds,
              //         maxLimitOdds,
              //       )
              //     : navigate('/login');
              // }}
            >
              {data?.runners?.[2]?.backPrice1 || '-'}
            </button>
          ) : (
            <DisableButton btncolor={'blue'} />
          )}
          {data?.runners?.[2]?.layPrice1 ? (
            <button
              className="bg-[#faaabb] cursor-default px-4 md:py-1 h-fit md:h-auto text-center text-14 font-semibold  text-black"
              // onClick={() => {
              //   isLogin
              //     ? addToBetPlace(
              //         data?.competition_name,
              //         data?.event_id || data?.matchId,
              //         data?.runners?.[2]?.selectionId,
              //         data?.runners?.[2],
              //         'Cricket',
              //         data?.runners?.[2]?.layPrice1,
              //         data?.market_name,
              //         'LAY',
              //         data?.name,
              //         data?.market_id,
              //         data?.runners,
              //         data?.sportId,
              //         minLimitOdds,
              //         maxLimitOdds,
              //       )
              //     : navigate('/login');
              // }}
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
              className="bg-[#73bcf0] cursor-default px-4 md:py-1 h-fit md:h-auto text-center text-14 font-semibold  text-black"
              // onClick={() => {
              //   isLogin
              //     ? addToBetPlace(
              //         data?.competition_name,
              //         data?.event_id || data?.matchId,
              //         data?.runners?.[1]?.selectionId,
              //         data?.runners?.[1],
              //         'Cricket',
              //         data?.runners?.[1]?.backPrice1,
              //         data?.market_name,
              //         'BACK',
              //         data?.name,
              //         data?.market_id,
              //         data?.runners,
              //         data?.sportId,
              //         minLimitOdds,
              //         maxLimitOdds,
              //       )
              //     : navigate('/login');
              // }}
            >
              {data?.runners?.[1]?.backPrice1 || '-'}
            </button>
          ) : (
            <DisableButton btncolor={'blue'} />
          )}
          {data?.runners?.[1]?.layPrice1 ? (
            <button
              className="bg-[#faaabb] cursor-default px-4 md:py-1 h-fit md:h-auto text-center text-14 font-semibold  text-black"
              // onClick={() => {
              //   isLogin
              //     ? addToBetPlace(
              //         data?.competition_name,
              //         data?.event_id || data?.matchId,
              //         data?.runners?.[1]?.selectionId,
              //         data?.runners?.[1],
              //         'Cricket',
              //         data?.runners?.[1]?.layPrice1,
              //         data?.market_name,
              //         'LAY',
              //         data?.name,
              //         data?.market_id,
              //         data?.runners,
              //         data?.sportId,
              //         minLimitOdds,
              //         maxLimitOdds,
              //       )
              //     : navigate('/login');
              // }}
            >
              {data?.runners?.[1]?.layPrice1 || '-'}
            </button>
          ) : (
            <DisableButton btncolor={'pink'} />
          )}
        </div>
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
