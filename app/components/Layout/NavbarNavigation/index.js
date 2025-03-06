import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const dropdownOptions = ['Competitions', 'Time'];

const NavbarNavigation = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const storedItem = localStorage.getItem('selectedNavItem');
    if (storedItem) {
      setSelectedItem(storedItem);
    }
  }, []);

  const [liveActive, setLiveActive] = useState(false);
  const [virtualActive, setVirtualActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState('Time');

  return (
    <div className=" bg-white space-y-1">
      {/* onclick items name  */}
      <div className="bg-black text-white p-2 text-left inline-block">
        {selectedItem}
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
                <div className="absolute top-full right-0 w-48 bg-gray-500 border border-gray-600 shadow-lg rounded-md overflow-hidden">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedDropdown(option);
                        setDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left uppercase text-white hover:bg-gray-600 transition-colors"
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

export default NavbarNavigation;
