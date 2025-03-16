import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen w-full fixed left-0 right-0 top-0 bottom-0 flex-center backdrop-blur-lg z-[999]">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
