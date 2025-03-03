import SecondComponent from '@/components/SecondComponent';
import ImageComponent from '@/components/ImageComponent';
import ThirdComponent from '@/components/ThirdComponent';
import TopComponent from '@/components/TopComponent';
import React from 'react';

const Home = () => {
  return (
    <div className="bg-white w-full flex flex-col ">
      <div className="">
        <TopComponent />
      </div>
      <div className="w-full">
        <SecondComponent />
      </div>
      <div className="w-full">
        <ThirdComponent />
      </div>
      <div className="w-full">
        <ImageComponent />
      </div>
    </div>
  );
};

export default Home;
