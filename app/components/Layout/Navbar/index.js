import { isLoggedIn } from '@/utils/apiHandlers';
import React from 'react';

const Navbar = () => {
  const isLogin = isLoggedIn();
  console.log(isLogin);
  return (
    <section className="flex w-full">
      <div>logo</div>
      <div>
        <div></div>
        <marquee>Dayal</marquee>
      </div>
    </section>
  );
};

export default Navbar;
