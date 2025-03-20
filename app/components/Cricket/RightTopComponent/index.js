import { RiComputerLine } from 'react-icons/ri';
import React from 'react';
import PropTypes from 'prop-types';

const RightTopComponent = ({ stream, live }) => {
  return (
    <div className="rounded-t flex justify-between items-center w-full h-auto cursor-pointer bg-[#8000ff] text-white gap-1 px-2">
      {/* Left side text with truncation */}
      <p className="text-16  flex-1">{stream}</p>

      {/* Right side icon and text aligned */}
      <div className="flex items-center gap-1 ">
        {live && (
          <>
            <RiComputerLine className="text-lg" />
            <span className="text-16">{live}</span>
          </>
        )}
      </div>
    </div>
  );
};
RightTopComponent.propTypes = {
  stream: PropTypes.string.isRequired,
  live: PropTypes.string.isRequired,
};

export default RightTopComponent;
