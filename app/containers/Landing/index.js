import { LeftSidebar, Navbar } from '@/components';
import SecondComponent from '@/components/SecondComponent';
import TopComponent from '@/components/TopComponent';
import { reactIcons } from '@/utils/icons';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Landing() {
  const [showSports, setShowSports] = useState(true);
  const toggleSports = () => {
    setShowSports((prev) => !prev);
  };
  return (
    <div className="overflow-x-hidden">
      {/* <Navbar /> */}
      <div>
        <Navbar />
      </div>
      <div className="flex gap-1 ">
        <div className="w-[15vw] flex-shrink-0 bg-[#CCCCCC]">
          <div className="bg-[#008000] flex items-center gap-2 py-2 px-2 mb-[1px]">
            <img src="/images/depositImg.webp" className="w-6" alt="" />
            <p className="text-14">Deposit</p>
          </div>
          <div className="bg-[#FF0000] flex items-center gap-2 py-2 px-2 mb-[1px]">
            <img src="/images/withdrawImg.webp" className="w-6" alt="" />
            <p className="text-14">Withdraw</p>
          </div>
          <div className="bg-black flex items-center justify-between  gap-2 py-2 px-2 mb-[1px]">
            <p className="text-14 font-semibold ">Others</p>
            <span className="-rotate-90 font-bold">{reactIcons.arrowDown}</span>
          </div>
          <div
            onClick={toggleSports}
            className="bg-black flex items-center justify-between  gap-2 py-2 px-2 mb-[1px]"
          >
            <p className="text-14 font-semibold ">All Sports</p>
            <span className={`font-bold ${!showSports ? '-rotate-90' : ''}`}>
              {reactIcons.arrowDown}
            </span>
          </div>
          {showSports && <LeftSidebar />}
        </div>
        <div className="w-[85vw] bg-white h-full p-2">
          <TopComponent />
          <SecondComponent />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Landing;
