/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { isLoggedIn, removeAuthCookie } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '@/redux/actions';
import { numberWithCommas } from '@/utils/numberWithCommas';
import { useMediaQuery } from '@mui/material';
import { reactIcons } from '@/utils/icons';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBalancePopupOpen, setIsBalancePopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = isLoggedIn();
  const userInfo = useSelector((state) => state.user);
  const isMobile = useMediaQuery('(max-width:767px)');
  const profileOptions = [
    'Profile Settings',
    'Account History',
    'Change Password',
    'Logout',
  ];

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'CRICKET', path: '/' },
    { name: 'FOOTBALL', path: '/football' },
    { name: 'TENNIS', path: '/tennis' },
    { name: 'CASINO', path: '/cricket' },
    { name: 'INT CASINO', path: '/cricket' },
    { name: 'SPORTS BOOK', path: '/cricket' },
    { name: 'HORSE RACING', path: '/cricket' },
    { name: 'GREYHOUND RACING', path: '/cricket' },
    { name: 'BINARY', path: '/cricket' },
    { name: 'KABADDI', path: '/cricket' },
    { name: 'POLITICS', path: '/cricket' },
    { name: 'BASKETBALL', path: '/cricket' },
    { name: 'BASEBALL', path: '/cricket' },
    { name: 'TABLE TENNIS', path: '/cricket' },
  ];

  const scrollRef = useRef(null);

  const handleClick = (item) => {
    setSelectedItem(item.name);
    localStorage.setItem('selectedNavItem', item.name);
    navigate(item.path);
  };
  const handleMouseDown = (e) => {
    const slider = scrollRef.current;
    let startX = e.pageX - slider.offsetLeft;
    let scrollLeft = slider.scrollLeft;

    const handleMouseMove = (event) => {
      const x = event.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Adjust speed
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  const handleLogout = async () => {
    navigate('/');
    Cookies.remove('__user__isLoggedIn');
    Cookies.remove('test__user__isLoggedIn');
    Cookies.remove('development__user__isLoggedIn');
    localStorage.removeItem('yolo_userID');
    localStorage.removeItem('yolo_userName');
    removeAuthCookie();
    toast.success('Logged Out Successfully...');
  };
  useEffect(() => {
    if (isLogin) {
      dispatch(init());
      const intervalId = setInterval(() => {
        dispatch(init());
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, isLogin]);
  return (
    <>
      {isMobile ? (
        <div className="p-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <div className="text-2xl">{reactIcons?.faHome}</div>
              <img
                src="/images/logo.png"
                alt="Gold365"
                className="object-contain cursor-pointer w-[100px]"
                onClick={() => navigate('/')}
              />
            </div>
            <div className="flex  flex-col items-end">
              <div className="flex items-center gap-1">
                <img
                  src="/images/landmark-icon.webp"
                  alt=""
                  className="object-contain cursor-pointer w-[18px]"
                />
                <p>
                  {' '}
                  {numberWithCommas(
                    userInfo?.balance - Math.abs(userInfo?.exposureAmount) || 0,
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {isLogin ? (
                  <>
                    <p className="text-white text-14 hover:text-gray-300 whitespace-nowrap leading-none">
                      Exp: {numberWithCommas(userInfo?.exposureAmount || 0)}
                    </p>
                    {/* Profile Dropdown */}
                    <div className="relative group">
                      <button className="text-white text-14 flex items-center gap-1 whitespace-nowrap">
                        {userInfo?.username || 'User'} <ChevronDown size={16} />
                      </button>

                      {/* Dropdown on Hover */}
                      <div className="absolute top-2 right-0 mt-2 bg-white text-black py-2 rounded shadow-lg z-50 hidden group-hover:block">
                        {profileOptions.map((option, index) => (
                          <button
                            onClick={() => option == 'Logout' && handleLogout()}
                            key={index}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200 text-14"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="text-white text-14 flex items-center gap-1 whitespace-nowrap"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-2 ">
            <Link
              to="/deposit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 justify-center bg-green-600 text-white px-[1vw] py-[0.5vw] rounded border border-white text-[13px] hover:bg-green-700 whitespace-nowrap"
            >
              <img
                src="/images/deposit-icon.webp"
                alt="deposit-icon"
                className="w-6"
              />
              <span className="font-bold ">DEPOSIT</span>
            </Link>

            <Link
              to="/withdraw"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 justify-center bg-red-600 text-white px-[1vw] py-[0.5vw] rounded border border-white text-[13px] hover:bg-red-700 whitespace-nowrap"
            >
              <img
                src="/images/withdrawal-icon.webp"
                alt="withdraw-icon"
                className="w-6"
              />
              <span className="font-bold ">WITHDRAWAL</span>
            </Link>
          </div>
          <div className="w-full relative text-white font-bold text-[13px] mt-2">
            <marquee direction="left">
              🏏 𝐈𝐂𝐂 𝐂𝐇𝐀𝐌𝐏𝐈𝐎𝐍𝐒 𝐓𝐑𝐎𝐏𝐇𝐘 𝐂𝐔𝐏 𝐖𝐈𝐍𝐍𝐄𝐑 🏆𝐌𝐀𝐑𝐊𝐄𝐓 𝐒𝐓𝐀𝐑𝐓𝐄𝐃 𝐈𝐍 𝐎𝐔𝐑
              𝐄𝐗𝐂𝐇𝐀𝐍𝐆𝐄 🏏 🏆𝐖𝐎𝐌𝐄𝐍 𝐏𝐑𝐄𝐌𝐈𝐄𝐑 𝐋𝐄𝐀𝐆𝐔𝐄 𝐂𝐔𝐏 𝐖𝐈𝐍𝐍𝐄𝐑🏆 𝐌𝐀𝐑𝐊𝐄𝐓 𝐒𝐓𝐀𝐑𝐓𝐄𝐃 𝐈𝐍
              𝐔𝐑 𝐄𝐗𝐂𝐇𝐀𝐍𝐆𝐄🏆 𝐎𝐔𝐑 𝐄𝐗𝐂𝐋𝐔𝐒𝐈𝐕𝐄 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐀𝐑𝐊𝐄𝐓 𝐅𝐎𝐑 (𝐒𝐑𝐋) 𝐈𝐒 𝐍𝐎𝐖
              𝐒𝐓𝐀𝐑𝐓𝐄𝐃 𝐈𝐍 𝐎𝐔𝐑 𝐄𝐗𝐂𝐇𝐀𝐍𝐆𝐄 , 𝐃𝐑𝐄𝐀𝐌 𝐁𝐈𝐆 𝐖𝐈𝐍 𝐁𝐈𝐆 💰
            </marquee>
            <div className=" left-1 ay-center flex items-center justify-center p-2 rounded-full bg-white text-black font-[1000] text-sm">
              {reactIcons.search}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full relative">
          {/* Top Bar */}
          <div className="bg-black w-full flex pl-2 pr-2 pt-2">
            {/* Logo Section (40%) */}
            <div className="w-[35%]">
              <img
                src="/images/logo.png"
                alt="Gold365"
                className="h-[5vw] w-[22vw] object-contain cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>

            {/* Right Section (60%) */}
            <div className="w-[65%] flex flex-col mt-2">
              {/* Top Row with Controls */}
              <div className="flex items-center justify-end gap-2">
                {/* Deposit Button */}
                <a
                  href="/deposit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-green-600 text-white px-[1vw] py-[0.5vw] rounded border border-white text-[0.8vw] hover:bg-green-700 whitespace-nowrap"
                >
                  <img
                    src="/images/deposit-icon.webp"
                    alt="deposit-icon"
                    className="w-[2vw] h-[2vw]"
                  />
                  <span className="font-bold text-[1vw]">DEPOSIT</span>
                </a>

                {/* Withdraw Button */}
                <a
                  href="/withdraw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-red-600 text-white px-[1vw] py-[0.5vw] rounded border border-white text-[0.8vw] hover:bg-red-700 whitespace-nowrap"
                >
                  <img
                    src="/images/withdrawal-icon.webp"
                    alt="withdraw-icon"
                    className="w-[2vw] h-[2vw]"
                  />
                  <span className="font-bold text-[1vw]">WITHDRAWAL</span>
                </a>

                {/* Search Bar */}
                <div className="flex items-center gap-2 relative">
                  <div
                    className={`overflow-hidden transition-[width] duration-500 ease-in-out bg-white shadow-md ${
                      isSearchOpen ? 'w-[20vw] px-2 py-1' : 'w-0 px-0 py-0'
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="All Events"
                      className="bg-white text-gray-950 outline-none w-full transition-opacity duration-300 ease-in-out"
                      style={{ opacity: isSearchOpen ? 1 : 0 }}
                      autoFocus
                    />
                  </div>
                  <FaSearchPlus
                    className="text-white w-[2vw] h-[2vw] cursor-pointer"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                  />
                </div>

                {/* Rules Link */}
                <a
                  href="/rules"
                  className="text-white text-0.8vw hover:text-gray-300 whitespace-nowrap"
                >
                  Rules
                </a>

                {/* Balance Button */}
                {isLogin ? (
                  <>
                    {' '}
                    <button
                      onClick={() => setIsBalancePopupOpen(true)}
                      className="text-white text-0.8vw hover:text-gray-300 whitespace-nowrap leading-none"
                    >
                      Balance:{' '}
                      {numberWithCommas(
                        userInfo?.balance -
                          Math.abs(userInfo?.exposureAmount) || 0,
                      )}
                      <br />
                      <span className="underline">
                        Exposure:{' '}
                        {numberWithCommas(userInfo?.exposureAmount || 0)}
                      </span>
                    </button>
                    {/* Profile Dropdown */}
                    <div className="relative group">
                      <button className="text-white text-0.8vw flex items-center gap-1 whitespace-nowrap">
                        {userInfo?.username || 'User'} <ChevronDown size={16} />
                      </button>

                      {/* Dropdown on Hover */}
                      <div className="absolute top-2 right-0 mt-2 bg-white text-black py-2 rounded shadow-lg z-50 hidden group-hover:block">
                        {profileOptions.map((option, index) => (
                          <button
                            onClick={() => option == 'Logout' && handleLogout()}
                            key={index}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200 text-0.8vw"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="text-white text-0.8vw flex items-center gap-1 whitespace-nowrap"
                  >
                    Login
                  </button>
                )}
              </div>

              {/* Bottom Row with Marquee */}
              <div className="w-full text-white font-bold text-0.8vw">
                <marquee direction="left">
                  🏏 𝐈𝐂𝐂 𝐂𝐇𝐀𝐌𝐏𝐈𝐎𝐍𝐒 𝐓𝐑𝐎𝐏𝐇𝐘 𝐂𝐔𝐏 𝐖𝐈𝐍𝐍𝐄𝐑 🏆𝐌𝐀𝐑𝐊𝐄𝐓 𝐒𝐓𝐀𝐑𝐓𝐄𝐃 𝐈𝐍 𝐎𝐔𝐑
                  𝐄𝐗𝐂𝐇𝐀𝐍𝐆𝐄 🏏 🏆𝐖𝐎𝐌𝐄𝐍 𝐏𝐑𝐄𝐌𝐈𝐄𝐑 𝐋𝐄𝐀𝐆𝐔𝐄 𝐂𝐔𝐏 𝐖𝐈𝐍𝐍𝐄𝐑🏆 𝐌𝐀𝐑𝐊𝐄𝐓 𝐒𝐓𝐀𝐑𝐓𝐄𝐃
                  𝐈𝐍 𝐎𝐔𝐑 𝐄𝐗𝐂𝐇𝐀𝐍𝐆𝐄🏆 𝐎𝐔𝐑 𝐄𝐗𝐂𝐋𝐔𝐒𝐈𝐕𝐄 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐀𝐑𝐊𝐄𝐓 𝐅𝐎𝐑 (𝐒𝐑𝐋) 𝐈𝐒
                  𝐍𝐎𝐖 𝐒𝐓𝐀𝐑𝐓𝐄𝐃 𝐈𝐍 𝐎𝐔𝐑 𝐄𝐗𝐂𝐇𝐀𝐍𝐆𝐄 , 𝐃𝐑𝐄𝐀𝐌 𝐁𝐈𝐆 𝐖𝐈𝐍 𝐁𝐈𝐆 💰
                </marquee>
              </div>
            </div>
          </div>

          {/* Navigation Menu with Scroll */}
          <div
            ref={scrollRef}
            className="bg-[#8000ff] w-full hidden lg:flex items-center py-[0.8vw] gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
            onMouseDown={handleMouseDown}
          >
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item)}
                className="relative text-white px-[1.5vw] text-[1.2vw] font-extrabold flex-1 text-center whitespace-nowrap transition-all ease-in-out
after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:origin-center 
hover:after:left-0 hover:after:w-full"
              >
                {item.name}
              </button>
            ))}
          </div>
          {/* Balance Popup */}
          {isBalancePopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-[80%] h-[80%] rounded-lg relative">
                <button
                  onClick={() => setIsBalancePopupOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="p-6">
                  <h2 className="text-2xl font-bold">Balance Details</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
