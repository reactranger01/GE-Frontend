import { getReq } from '@/utils/apiHandlers';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventSearch from '../EventSearch';
import { reactIcons } from '@/utils/icons';
const LeftSideBar = () => {
  const [step, setStep] = useState(0);
  const [tournamentData, setTournamentData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [singleTournament, setSingleTournament] = useState({});
  const [singleId, setsingleId] = useState('');
  const [currentGame, setCurrentGame] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getCompition = async (game) => {
    try {
      const res = await getReq(`/catalogue/${game}/competitions`);
      if (res?.status === 200) {
        setTournamentData(res.data);
      } else {
        setTournamentData([]);
      }
    } catch (error) {
      setTournamentData([]);
    }
  };

  const handleLinkClick = (game) => {
    setSingleTournament({});
    getCompition(game);
    setCurrentGame(game);
    setStep(1);
  };

  const handleLinkSub = async (item, game) => {
    try {
      setSingleTournament(item);
      setStep(2);
      const res = await getReq(
        `/catalogue/${game}/events?seriesId=${item?.seriesId}`,
      );
      if (res?.status === 200) {
        const filteredData = res.data.filter(
          (event) => event.isDelete === false,
        );
        setEventsData(filteredData);
      } else {
        setEventsData([]);
      }
    } catch (error) {
      setEventsData([]);
    }
  };

  const navigationItems = [
    { icon: '/images/icon/cricket.png', text: 'Cricket', route: 'cricket' },
    { icon: '/images/icon/football.png', text: 'Football', route: 'soccer' },
    { icon: '/images/icon/football.png', text: 'Tennis', route: 'tennis' },
    {
      icon: '/images/icon/football.png',
      text: 'Horce Racing',
      route: '#',
    },
    {
      icon: '/images/icon/football.png',
      text: 'Greyhound Racing',
      route: '#',
    },
    { icon: '/images/icon/football.png', text: 'Binary', route: '#' },
    { icon: '/images/icon/football.png', text: 'Basketball', route: '#' },
    {
      icon: '/images/icon/football.png',
      text: 'Table #',
      route: '#',
    },
    { icon: '/images/icon/football.png', text: 'Volleyball', route: '#' },
    { icon: '/images/icon/football.png', text: 'Ice Hockey', route: '#' },
    { icon: '/images/icon/football.png', text: 'Darts', route: '#' },
  ];

  const backStep0 = () => {
    setStep(0);
    setTournamentData([]);
  };
  const backStep1 = () => {
    setStep(1);
    setEventsData([]);
  };

  const filteredData = eventsData.filter((item) =>
    item?.name?.toLowerCase().includes(search?.toLowerCase()),
  );
  return (
    <>
      <div className="flex flex-col gap-[2px]  border  xl:sticky xl:top-40 overflow-y-auto theme-scroller  xl:bg-none  relative top-0 ">
        {step === 0 && (
          <>
            {navigationItems.map((item, index) => (
              <>
                <NavLink
                  key={index}
                  className={`py-1 flex-shrink-0 flex items-center justify-between px-2 bg-primary-darkBlue hover:bg-gradient1
          }`}
                  onClick={() => handleLinkClick(item?.route)}
                >
                  <div className="flex items-center gap-1">
                    <span className="text-18 text-black">
                      {reactIcons.square}
                    </span>

                    <span className="text-14 leading-3 text-black">
                      {item.text}
                    </span>
                  </div>
                </NavLink>
              </>
            ))}
          </>
        )}
        {step === 1 && (
          <div className="relative h-full">
            <div className="h-[42px] absolute top-0 left-0 w-full flex-shrink-0 bg-primary-700 flex items-center gap-3 px-3 first-of-type:rounded-tl-lg first-of-type:rounded-tr-lg">
              <button
                onClick={backStep0}
                className="text-black text-16 w-[30px] h-[30px] bg-white rounded-full flex-center"
              >
                {reactIcons.arrowleft1}
              </button>
              <span className="font-semibold text-white">Previous</span>
            </div>
            <div className="h-[calc(100%-42px)] relative top-[42px] overflow-y-auto theme-scroller">
              <div className="py-2 flex-shrink-0 bg-primary-100 flex items-center gap-3 px-3 mt-[2px]">
                <img
                  src={
                    currentGame === 'cricket'
                      ? '/images/icon/cricket.png'
                      : '/images/icon/football.png'
                  }
                  className="w-[18px]"
                  alt=""
                />{' '}
                <span>
                  {currentGame.toUpperCase() === 'SOCCER'
                    ? 'FOOTBALL'
                    : currentGame.toUpperCase()}
                </span>
              </div>
              {tournamentData?.map((item, index) => (
                <>
                  <NavLink
                    key={index}
                    // to={`/football${item.path}`}
                    className={`h-[36px] flex-shrink-0 flex items-center justify-between px-4 hover:bg-gradient1 ${
                      singleTournament?.competition?.id === item?.seriesId
                        ? 'bg-gradient1'
                        : ''
                    }`}
                    onClick={() => handleLinkSub(item, currentGame)}
                  >
                    <span className="text-12 leading-4">
                      {item?.competition_name}
                    </span>
                    <span
                      className={`text-15 ml-left ${
                        singleTournament?.competition?.id ===
                        item?.competition?.id
                          ? 'rotate-90'
                          : ''
                      }`}
                    >
                      {reactIcons.arrowright}
                    </span>
                  </NavLink>
                </>
              ))}{' '}
            </div>
          </div>
        )}
        {step === 2 && (
          <>
            <div className="h-[42px] flex-shrink-0 bg-primary-700 flex items-center gap-3 px-3 first-of-type:rounded-tl-lg first-of-type:rounded-tr-lg">
              <button
                onClick={backStep1}
                className="text-black text-16 w-[30px] h-[30px] bg-white rounded-full flex-center"
              >
                {reactIcons.arrowleft1}
              </button>
              <span className="font-semibold text-white">Previous</span>
            </div>
            <div className="py-2 flex-shrink-0 bg-primary-100 flex items-center gap-3 px-3 mt-[2px]">
              <img
                src={
                  currentGame === 'cricket'
                    ? '/images/icon/cricket.png'
                    : '/images/icon/football.png'
                }
                className="w-[18px]"
                alt={
                  currentGame === 'cricket'
                    ? '/images/icon/cricket.png'
                    : '/images/icon/football.png'
                }
              />{' '}
              <span className="leading-[18px]">
                {singleTournament?.competition_name}
              </span>
            </div>
            {eventsData.length !== 0 && (
              <div className="px-2 mt-1">
                {' '}
                <EventSearch
                  name={'search'}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            )}
            {filteredData.length === 0 ? (
              <div className="flex justify-center text-12">No Match </div>
            ) : (
              <>
                {filteredData &&
                  filteredData.map((item, index) => (
                    <div
                      key={index}
                      className={`py-2 flex-shrink-0 flex items-center justify-between px-4 hover:bg-gradient1 ${
                        singleId === item?.matchId ? 'bg-gradient1' : ''
                      }`}
                      onClick={() => {
                        // handleSidebarClose();
                        setsingleId(item?.matchId),
                          navigate(
                            `/single-bet/${currentGame?.toLowerCase()}/${
                              item?.matchId
                            }`,
                            {
                              state: { data: item },
                            },
                          );
                        // handleCloseFunction;
                      }}
                    >
                      <span className="text-12 leading-4 pl-2">
                        {item?.name}
                      </span>
                      <span className="text-18 ml-left">
                        {reactIcons.arrowright}
                      </span>
                    </div>
                  ))}{' '}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
LeftSideBar.propTypes = {
  handleSidebarClose: PropTypes.func,
};
export default LeftSideBar;
