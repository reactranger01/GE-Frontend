import { LeftSidebar, Navbar } from '@/components';
import SecondComponent from '@/components/SecondComponent';
import TopComponent from '@/components/TopComponent';
import { reactIcons } from '@/utils/icons';
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function Landing() {
  const [showSports, setShowSports] = useState(true);
  const toggleSports = () => {
    setShowSports((prev) => !prev);
  };
  const location = useLocation();

  // Check if the pathname matches any of the patterns
  const isMarketPage = [
    '/cricket-market/',
    '/football-market/',
    '/tennis-market/',
  ].some((path) => location.pathname.startsWith(path));
  return (
    <div className="overflow-x-hidden">
      {/* <Navbar /> */}
      <div>
        <Navbar />
      </div>
      <div className="flex gap-1 ">
        <div className="w-[15vw] lg:block flex-shrink-0 bg-[#CCCCCC] hidden">
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
        <div className="w-full lg:w-[85vw] bg-white h-full md:p-2 ">
          {!isMarketPage && (
            <>
              <TopComponent />
              <SecondComponent />
            </>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Landing;
