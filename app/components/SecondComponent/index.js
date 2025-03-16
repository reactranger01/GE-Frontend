import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

const items = [
  { id: 1, name: 'Inplay', path: '/inplay' },
  { id: 2, name: 'Cricket', path: '/' },
  { id: 3, name: 'Football', path: '/football' },
  { id: 4, name: 'Tennis', path: '/tennis' },
  { id: 5, name: 'Casino', path: '/#' },
  { id: 6, name: 'Int Casino', path: '/#' },
  { id: 7, name: 'Horse Racing', path: '/#' },
  { id: 8, name: 'GreyHound Racing', path: '/#' },
  { id: 9, name: 'Binary', path: '/#' },
  { id: 10, name: 'Kabaddi', path: '/#' },
  { id: 11, name: 'Politics', path: '/#' },
  { id: 12, name: 'Basketball', path: '/#' },
  { id: 13, name: 'Baseball', path: '/#' },
  { id: 14, name: 'Table Tennis', path: '/#' },
  { id: 15, name: 'Volleyball', path: '/#' },
  { id: 16, name: 'Ice Hockey', path: '/#' },
  { id: 17, name: 'Rugby', path: '/#' },
  { id: 18, name: 'Mixed Martial Arts', path: '/#' },
  { id: 19, name: 'Darts', path: '/#' },
  { id: 20, name: 'Futsal', path: '/#' },
];
const mobItems = [
  {
    id: 1,
    name: 'CRICKET',
    path: '/',
    image: '/images/Slider/cricketIcon.png',
  },
  {
    id: 2,
    name: 'FOOTBALL',
    path: '/football',
    image: '/images/Slider/footballIcon.png',
  },
  {
    id: 3,
    name: 'TENNIS',
    path: '/tennis',
    image: '/images/Slider/tennisIcon.png',
  },
  {
    id: 4,
    name: 'HORSE RACING',
    path: '/#',
    image: '/images/Slider/horseIcon.png',
  },
  {
    id: 5,
    name: 'GREYHOUND RACING',
    path: '/#',
    image: '/images/Slider/dogIcon.png',
  },
  {
    id: 7,
    name: 'BINARY',
    path: '/#',
    image: '/images/Slider/binaryIcon.png',
  },
  {
    id: 8,
    name: 'KABADDI',
    path: '/#',
    image: '/images/Slider/kabaddiIcon.png',
  },
  {
    id: 9,
    name: 'Binary',
    path: '/#',
    image: '/images/Slider/Icon.png',
  },
  {
    id: 10,
    name: 'POLITICS',
    path: '/#',
    image: '/images/Slider/politicsIcon.png',
  },

  // { id: 12, name: 'Basketball', path: '/#' },
  // { id: 13, name: 'Baseball', path: '/#' },
  // { id: 14, name: 'Table Tennis', path: '/#' },
  // { id: 15, name: 'Volleyball', path: '/#' },
  // { id: 16, name: 'Ice Hockey', path: '/#' },
  // { id: 17, name: 'Rugby', path: '/#' },
  // { id: 18, name: 'Mixed Martial Arts', path: '/#' },
  // { id: 19, name: 'Darts', path: '/#' },
  // { id: 20, name: 'Futsal', path: '/#' },
];
const dropdownOptions = ['Competitions', 'Time'];

const SecondComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [liveActive, setLiveActive] = useState(false);
  const [virtualActive, setVirtualActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('Time');
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <div className="w-full bg-white space-y-1">
      {/* Top Navigation Bar */}
      {isMobile ? (
        <div className="flex bg-purple-600 gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400">
          {mobItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`p-1 font-bold text-12 flex flex-col justify-center items-center h-full transition-colors ${
                location.pathname === item.path
                  ? 'bg-black text-white'
                  : 'text-white hover:bg-purple-700'
              }`}
            >
              <img src={item.image} className="h-5" alt="" />
              {item.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-purple-600 h-14 px-3 pl-0">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 font-bold text-16 flex items-center h-full transition-colors ${
                  location.pathname === item.path
                    ? 'bg-black text-white'
                    : 'text-white hover:bg-purple-700'
                }`}
              >
                {item?.name?.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls Section */}
      <div className="flex md:justify-end justify-between w-full items-center border-b-2 border-gray-200 pb-2 md:px-4 px-2">
        <div className="flex items-center md:gap-4 gap-1 w-full justify-between md:justify-end">
          {/* Live Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiveActive(!liveActive)}
              className={`md:px-2 text-12 px-2  border border-black  rounded-full flex items-center gap-2 transition-colors ${
                liveActive ? 'bg-green-500 text-white' : 'bg-white text-black'
              }`}
            >
              <span>{liveActive ? '+' : '-'}</span>
              <span>LIVE</span>
            </button>

            {/* Virtual Button */}
            <button
              onClick={() => setVirtualActive(!virtualActive)}
              className={`md:px-2 text-12  px-2 border border-black rounded-full  flex items-center gap-2 transition-colors ${
                virtualActive
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-black'
              }`}
            >
              <span>{virtualActive ? '+' : '-'}</span>
              <span>VIRTUAL</span>
            </button>
          </div>
          {/* View By Dropdown */}
          <div className="relative flex items-center gap-2">
            <span className="text-black font-medium text-12 ">View By:</span>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="md:w-32 md:h-7 text-12   bg-black text-white rounded-md px-4 flex items-center justify-between"
              >
                <span className="uppercase">{selectedDropdown}</span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 md:w-32 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedDropdown(option);
                        setDropdownOpen(false);
                      }}
                      className="w-full px-2  text-12 hover:bg-blue-600 hover:text-white text-left uppercase text-white bg-gray-500 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondComponent;
