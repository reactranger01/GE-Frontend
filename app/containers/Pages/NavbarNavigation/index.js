import React from 'react';
import NavbarNavigation from '@/components/Layout/NavbarNavigation';
import ThirdComponent from '@/components/ThirdComponent';
import TopComponent from '@/components/TopComponent';

const NavbarNavigationPage = () => {
  return (
    <div>
      <div>
        <TopComponent />
      </div>
      <div>
        <NavbarNavigation />
      </div>
      <div>
        <ThirdComponent />
      </div>
    </div>
  );
};

export default NavbarNavigationPage;
