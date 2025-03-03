import React from 'react';

const OuterHeading = () => {
  return (
    <div className="grid grid-cols-15 gap-0 mb-2 items-center">
      <div className="col-span-8 px-4 py-2 text-sm font-bold text-black">
        Game
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-2 text-center text-sm font-bold text-black">
        1
      </div>
      <div className="col-span-2 text-center text-sm font-bold text-black">
        X
      </div>
      <div className="col-span-2 text-center text-sm font-bold text-black">
        2
      </div>
    </div>
  );
};

export default OuterHeading;
