import React from 'react';
import PropTypes from 'prop-types';

const TopComponent = ({ game, dateTime }) => {
  return (
    <div className=" flex justify-between w-full h-auto bg-[#8000ffff] text-white p-1 gap-2 text-center">
      <h2 className="text-[13px] md:text-[15px] font-bold">{game}</h2>
      <p className="text-14 md:text-16">{dateTime}</p>
    </div>
  );
};
TopComponent.propTypes = {
  game: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
};

export default TopComponent;
