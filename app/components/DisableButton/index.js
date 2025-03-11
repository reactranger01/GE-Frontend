import React from 'react';
import { PropTypes } from 'prop-types';
const DisableButton = ({ btncolor }) => {
  return (
    <div
      className={` ${
        btncolor === 'pink'
          ? 'bg-[#faaabb] border-[#faaabb]'
          : btncolor === 'blue'
          ? 'bg-[#73bcf0] border-[#73bcf0]'
          : 'bg-neutral-400 '
      } px-4 md:py-2 text-center text-black cursor-not-allowed pointer-events-none opacity-50 h-fit md:h-auto `}
    >
      <span className="text-neutral-950 md:text-xl font-bold">-</span>
    </div>
  );
};
DisableButton.propTypes = {
  btncolor: PropTypes.any,
};
export default DisableButton;
//  bg-neutral-400
