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

const dropdownOptions = ['Competitions', 'Time'];

const SecondComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [liveActive, setLiveActive] = useState(false);
  const [virtualActive, setVirtualActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('Time');

  return (
    <div className="w-full bg-white space-y-1">
      {/* Top Navigation Bar */}
      <div className="bg-purple-600 h-14 px-3 pl-0">
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 font-bold text-xl flex items-center h-full transition-colors ${
                location.pathname === item.path
                  ? 'bg-black text-white'
                  : 'text-white hover:bg-purple-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex justify-end items-center border-b-2 border-gray-200 pb-2 px-4">
        <div className="flex items-center gap-4">
          {/* Live Button */}
          <button
            onClick={() => setLiveActive(!liveActive)}
            className={`px-6 py-2 border border-black font-bold rounded-full flex items-center gap-2 transition-colors ${
              liveActive ? 'bg-green-500 text-white' : 'bg-white text-black'
            }`}
          >
            <span>{liveActive ? '+' : '-'}</span>
            <span>Live</span>
          </button>

          {/* Virtual Button */}
          <button
            onClick={() => setVirtualActive(!virtualActive)}
            className={`px-6 py-2 border border-black rounded-full font-bold flex items-center gap-2 transition-colors ${
              virtualActive ? 'bg-green-500 text-white' : 'bg-white text-black'
            }`}
          >
            <span>{virtualActive ? '+' : '-'}</span>
            <span>Virtual</span>
          </button>

          {/* View By Dropdown */}
          <div className="relative flex items-center gap-2">
            <span className="text-black font-bold">View By:</span>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-48 h-10 bg-black text-white rounded-md px-4 flex items-center justify-between"
              >
                <span className="uppercase">{selectedDropdown}</span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedDropdown(option);
                        setDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left uppercase text-white bg-gray-500 transition-colors"
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
