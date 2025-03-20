/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  fetchBetDetailsAction,
  fetchCurrentCalculationAction,
  init,
  setBetPlacementSuccess,
} from '@/redux/actions';
import { getAuthData, isLoggedIn, postAuthData } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { betValidationSchema } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import { calcCurrentBetStats } from '@/utils/helper';
import toast from 'react-hot-toast';
import RightTopComponent from '../Cricket/RightTopComponent';
import moment from 'moment';
import { useMediaQuery } from '@mui/material';
// ORIGINAL BETSLIP
const BetSlip = () => {
  const [betData, setBetData] = useState({});
  const [currentBetWinLossDatas, setCurrentBetWinLossData] = useState(null);
  const bets = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();
  const [enent_ID, setEnent_ID] = useState(false);
  const [loading, setIsloading] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const [oldBets, setOldBets] = useState({});
  const [formError, setFormError] = useState({
    stake: '',
  });
  const islogin = isLoggedIn();
  const startDate = new Date();
  const endDate = new Date();
  const isMobileDevice = useMediaQuery('(max-width:767px)');

  const take = 10;
  const getOldBets = async () => {
    if (islogin) {
      try {
        const response = await getAuthData(
          `/bet/get-past-currentbets?status=current&limit=${take}&startdate=${moment(
            startDate,
          ).format('YYYY-MM-DD')}&enddate=${moment(endDate)
            .add(1, 'day')
            .format('YYYY-MM-DD')}`,
        );
        if (response?.status === 200) {
          setOldBets(response.data);
        }
        return null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  useEffect(() => {
    getOldBets();
    // eslint-disable-next-line
  }, [bets]);
  useEffect(() => {
    setBetData(bets?.[0]);
    setEnent_ID(bets?.[0]?.eventId);
  }, [bets]);

  useEffect(() => {
    if (bets.length == 0) {
      dispatch(fetchCurrentCalculationAction({}));
    }
  }, [bets.length]);

  useEffect(() => {
    if (userInfo) {
      const timer = setTimeout(() => {
        setBetData({ ...betData, currency: userInfo?.currency_type });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userInfo, betData]);

  const handleRemoveBet = (selectionId) => {
    const updatedBets = bets?.filter(
      (item) => item.selectionId !== selectionId,
    );
    setFormError({});
    dispatch(fetchBetDetailsAction(updatedBets));
    dispatch(fetchCurrentCalculationAction({}));
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setFormError((prev) => ({
      ...prev,
      stake: null,
    }));
    if (
      (betData?.market === 'Match Odds' || 'MATCH_ODDS') &&
      betData?._marketData?.inplay === false &&
      inputValue > 1
    ) {
      inputValue = e.target.value > 1 ? e.target.value : e.target.value;
      setBetData({ ...betData, stake: inputValue });
    } else {
      setBetData({ ...betData, stake: inputValue });
    }
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const betStake = [100, 200, 300, 500, 1000, 1500, 5000, 50000];

  const handleProfitzero = () => {
    dispatch(fetchCurrentCalculationAction(null));
  };
  const handleRestrictedGames = async (gameId) => {
    if (userInfo?.chip_setting?.includes(gameId)) {
      return true;
    } else {
      return false;
    }
  };
  const placeBet = async (e) => {
    e.preventDefault();
    const checkRestriction = await handleRestrictedGames(betData?.gameId);
    if (checkRestriction) {
      toast.error('Betting on this sport is not permitted.');
      setIsloading(false);
      return;
    }
    if (userInfo.betLock) {
      toast.error('Betting is currently locked. You cannot place a bet.');
      return;
    }
    setIsloading(true);
    setFormError({});

    let data =
      betData?.market == 'bookmaker'
        ? {
            ...betData,
            stake: Number(betData?.stake),
            price: betData.price / 100 + 1,
          }
        : { ...betData, stake: Number(betData?.stake) };
    data.stake = Number(data?.stake);
    if (data?.stake !== 0 && data?.price !== 0) {
      try {
        await betValidationSchema.validate(
          {
            ...data,
            minimumBet: betData?.minimumBet || 0,
            maximumBet: betData?.maximumBet || Infinity,
          },
          {
            abortEarly: false,
          },
        );
        setTimeout(async () => {
          await postAuthData('/bet/place', data)
            .then((response) => {
              if (response.status === 200) {
                setIsloading(false);
                toast.success('Bet Placed Successfully');
                handleRemoveBet(data.selectionId);
                dispatch(fetchCurrentCalculationAction({}));
                dispatch(fetchBetDetailsAction([]));
                dispatch(init([]));
                handleProfitzero();
                dispatch(setBetPlacementSuccess());
              } else {
                setIsloading(false);
                if (response.data.length > 0) {
                  toast.dismiss();
                  toast.error(response?.data || 'Something went wrong');
                } else {
                  toast.dismiss();
                  toast.error(response?.data || 'Something went wrong');
                }
              }
            })
            .catch((e) => {
              setIsloading(false);
              console.error(e);
            });
        }, 1000);
      } catch (error) {
        if (isYupError(error)) {
          setFormError(parseYupError(error));
        } else {
          toast.error('An error occurred while placing the bet');
        }
        setIsloading(false);
      }
    } else {
      setIsloading(false);
      toast.dismiss();
      toast.error('can not place bet due to missing odds');
    }
  };

  useEffect(() => {
    if (betData) {
      const calculationData = calcCurrentBetStats({ ...betData });
      dispatch(fetchCurrentCalculationAction(calculationData));
      setCurrentBetWinLossData(calculationData);
    }
  }, [betData, bets]);

  return (
    <>
      {isMobileDevice ? (
        <>
          {bets?.length > 0 && (
            <div
              className={`${
                bets?.[0]?.betOn === 'BACK' ? ' bg-[#72BBEF]' : ' bg-[#FAA9BA]'
              }`}
            >
              <table className="text-black">
                <thead>
                  <tr className="text-12 font-bold bg-[#CCCCCC]">
                    <th></th>
                    <th className="w-[35%] text-left">(Bet for)</th>
                    <th className="w-[25%]">Odds</th>
                    <th className="w-[15%] text-black">Stake</th>
                    <th className="w-[15%] text-black">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      onClick={() => {
                        handleRemoveBet(betData?.selectionId);
                      }}
                      className="font-[1000] text-[#dc3545] cursor-pointer"
                    >
                      {reactIcons?.faTimes}
                    </td>
                    <td className="text-14 font-bold truncate max-w-[70px]">
                      {bets?.[0]?.nation}
                    </td>
                    <td>
                      <div className="flex items-center">
                        <input
                          type="text"
                          disabled
                          value={
                            betData?.market == 'bookmaker'
                              ? parseFloat(
                                  (betData?.price / 100 + 1 || 0).toFixed(2),
                                )
                              : parseFloat((betData?.price || 0).toFixed(2))
                          }
                          className="outline-none border border-[#ccc] bg-white text-center text-14 w-full"
                        />
                        <div className="px-1 gap-1 flex flex-col items-center justify-center text-10 bg-[#F9F9F9] border border-[#ccc]">
                          <button type="button">{reactIcons.faAngleUp}</button>
                          <button type="button">
                            {reactIcons.faAngleDown}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="number"
                          onChange={handleChange}
                          value={betData?.stake}
                          placeholder="0"
                          className="outline-none border border-[#ccc] text-12 bg-white text-center w-full ml-2"
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-bold text-12 text-right">
                          {bets?.[0]?.betOn === 'BACK'
                            ? currentBetWinLossDatas?.calculation?.win.toFixed(
                                2,
                              ) || 0.0
                            : currentBetWinLossDatas?.calculation?.loss.toFixed(
                                2,
                              ) || 0.0}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="grid grid-cols-5 px-1 gap-1 text-[#000] ">
                {betStake &&
                  betStake.map((item) => {
                    return (
                      <button
                        key={item}
                        onClick={() => {
                          setBetData({
                            ...betData,
                            stake: item,
                          });
                        }}
                        className=" bg-[#CCCCCC] rounded text-12 flex-center hover:text-white"
                      >
                        {item}
                      </button>
                    );
                  })}
                <button
                  onClick={() => {
                    setBetData({ ...betData, stake: '100' });
                  }}
                  className=" bg-[#FFBC00] rounded text-[11px] flex-center hover:text-white leading-3"
                >
                  MIN STAKE
                </button>
                <button
                  onClick={() => {
                    setBetData({ ...betData, stake: '50000' });
                  }}
                  className=" bg-[#334579] text-white rounded text-[10px] font-bold flex-center hover:text-white leading-3"
                >
                  MAX STAKE
                </button>
                <button className=" bg-[#008000] text-white rounded text-[10px] font-bold flex-center hover:text-white leading-3">
                  EDIT STAKE
                </button>
                <button
                  onClick={() => {
                    setBetData({ ...betData, stake: '' });
                  }}
                  className=" bg-[#FF0000] text-white rounded text-[10px] font-bold flex-center hover:text-white"
                >
                  CLEAR
                </button>
              </div>

              <div className="  py-2 px-3 flex items-center justify-between  gap-5 mt-2">
                <button
                  onClick={() => {
                    handleRemoveBet(betData?.selectionId);
                  }}
                  className="bg-[#C82333] px-4 text-white w-fit py-1 text-14 flex-center gap-2 rounded-lg"
                >
                  Reset
                </button>
                <button
                  disabled={
                    betData?.stake === '' || betData?.stake === 0 || loading
                      ? true
                      : false
                  }
                  onClick={(e) => placeBet(e)}
                  className={` w-fit px-4 flex-center text-white text-14 gap-2  py-1 rounded-lg ${
                    betData?.stake === '' || betData?.stake === 0
                      ? 'bg-[#5c996f] '
                      : 'bg-[#218838] '
                  }`}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-14" />
                  ) : (
                    reactIcons.checkMark
                  )}
                  Submit
                </button>
              </div>
            </div>
          )}
          <div className="mt-2">
            <RightTopComponent stream="My Bet" />
          </div>
          <div>
            <table className="w-full  rounded-10">
              <tr className="text-black text-12 font-bold bg-[#CCCCCC]  px-2 rounded-t-10">
                <td className="pl-2 rounded-tl-10">Nation</td>
                <td>Odds</td>
                <td className="rounded-tr-10">Stake</td>
              </tr>
              <tbody className="mt-1">
                {oldBets?.bets && oldBets?.bets?.length > 0 ? (
                  oldBets?.bets?.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white text-black text-12 font-bold rounded-10"
                    >
                      <td className="pl-2    truncate">{item?.selection}</td>
                      <td>{item?.price}</td>
                      <td>{item?.stake}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white my-1 text-black rounded-10 border-y-8 border-[#F0F0F0]">
                    <td className="w-full text-center text-12" colSpan={3}>
                      No Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {' '}
          <RightTopComponent stream="Live Match" live="live stream started" />
          <div className="mt-2 w-full">
            <RightTopComponent stream="Place Bet" />
          </div>
          {bets?.length > 0 && (
            <div
              className={`${
                bets?.[0]?.betOn === 'BACK' ? ' bg-[#72BBEF]' : ' bg-[#FAA9BA]'
              }`}
            >
              <table className="text-black">
                <thead>
                  <tr className="text-12 font-bold bg-[#CCCCCC]">
                    <th></th>
                    <th className="w-[35%] text-left">(Bet for)</th>
                    <th className="w-[25%]">Odds</th>
                    <th className="w-[15%] text-black">Stake</th>
                    <th className="w-[15%] text-black">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      onClick={() => {
                        handleRemoveBet(betData?.selectionId);
                      }}
                      className="font-[1000] text-[#dc3545] cursor-pointer"
                    >
                      {reactIcons?.faTimes}
                    </td>
                    <td className="text-14 font-bold truncate max-w-[70px]">
                      {bets?.[0]?.nation}
                    </td>
                    <td>
                      <div className="flex items-center">
                        <input
                          type="text"
                          disabled
                          value={
                            betData?.market == 'bookmaker'
                              ? parseFloat(
                                  (betData?.price / 100 + 1 || 0).toFixed(2),
                                )
                              : parseFloat((betData?.price || 0).toFixed(2))
                          }
                          className="outline-none border border-[#ccc] bg-white text-center text-14 w-full"
                        />
                        <div className="px-1 gap-1 flex flex-col items-center justify-center text-10 bg-[#F9F9F9] border border-[#ccc]">
                          <button type="button">{reactIcons.faAngleUp}</button>
                          <button type="button">
                            {reactIcons.faAngleDown}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="number"
                          onChange={handleChange}
                          value={betData?.stake}
                          placeholder="0"
                          className="outline-none border border-[#ccc] text-12 bg-white text-center w-full ml-2"
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-bold text-12 text-right">
                          {bets?.[0]?.betOn === 'BACK'
                            ? currentBetWinLossDatas?.calculation?.win.toFixed(
                                2,
                              ) || 0.0
                            : currentBetWinLossDatas?.calculation?.loss.toFixed(
                                2,
                              ) || 0.0}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="grid grid-cols-5 px-1 gap-1 text-[#000] ">
                {betStake &&
                  betStake.map((item) => {
                    return (
                      <button
                        key={item}
                        onClick={() => {
                          setBetData({
                            ...betData,
                            stake: item,
                          });
                        }}
                        className=" bg-[#CCCCCC] rounded text-12 flex-center hover:text-white"
                      >
                        {item}
                      </button>
                    );
                  })}
                <button
                  onClick={() => {
                    setBetData({ ...betData, stake: '100' });
                  }}
                  className=" bg-[#FFBC00] rounded text-[11px] flex-center hover:text-white leading-3"
                >
                  MIN STAKE
                </button>
                <button
                  onClick={() => {
                    setBetData({ ...betData, stake: '50000' });
                  }}
                  className=" bg-[#334579] text-white rounded text-[10px] font-bold flex-center hover:text-white leading-3"
                >
                  MAX STAKE
                </button>
                <button className=" bg-[#008000] text-white rounded text-[10px] font-bold flex-center hover:text-white leading-3">
                  EDIT STAKE
                </button>
                <button
                  onClick={() => {
                    setBetData({ ...betData, stake: '' });
                  }}
                  className=" bg-[#FF0000] text-white rounded text-[10px] font-bold flex-center hover:text-white"
                >
                  CLEAR
                </button>
              </div>

              <div className="  py-2 px-3 flex items-center justify-between  gap-5 mt-2">
                <button
                  onClick={() => {
                    handleRemoveBet(betData?.selectionId);
                  }}
                  className="bg-[#C82333] px-4 text-white w-fit py-1 text-14 flex-center gap-2 rounded-lg"
                >
                  Reset
                </button>
                <button
                  disabled={
                    betData?.stake === '' || betData?.stake === 0 || loading
                      ? true
                      : false
                  }
                  onClick={(e) => placeBet(e)}
                  className={` w-fit px-4 flex-center text-white text-14 gap-2  py-1 rounded-lg ${
                    betData?.stake === '' || betData?.stake === 0
                      ? 'bg-[#5c996f] '
                      : 'bg-[#218838] '
                  }`}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-14" />
                  ) : (
                    reactIcons.checkMark
                  )}
                  Submit
                </button>
              </div>
            </div>
          )}
          <div className="mt-2">
            <RightTopComponent stream="My Bet" />
          </div>
          <div>
            <table className="w-full  rounded-10">
              <tr className="text-black text-12 font-bold bg-[#CCCCCC]  px-2 rounded-t-10">
                <td className="pl-2 rounded-tl-10">Nation</td>
                <td>Odds</td>
                <td className="rounded-tr-10">Stake</td>
              </tr>
              <tbody className="mt-1">
                {oldBets?.bets && oldBets?.bets?.length > 0 ? (
                  oldBets?.bets?.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white text-black text-12 font-bold rounded-10"
                    >
                      <td className="pl-2    truncate">{item?.selection}</td>
                      <td>{item?.price}</td>
                      <td>{item?.stake}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white my-1 text-black rounded-10 border-y-8 border-[#F0F0F0]">
                    <td className="w-full text-center text-12" colSpan={3}>
                      No Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default BetSlip;
