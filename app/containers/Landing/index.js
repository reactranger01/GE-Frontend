import { Footer, Navbar } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Landing() {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <Navbar />
      </div>
      <div className="flex gap-2">
        <div className="w-[200px] flex-shrink-0 bg-slate-600"></div>
        <div className="w-full bg-red-300">
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
