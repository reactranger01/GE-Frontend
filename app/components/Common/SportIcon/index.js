import { reactIcons } from '@/utils/icons';
import PropTypes from 'prop-types';
import React from 'react';

const SportIcon = ({ sport }) => {
  return (
    <div className="w-6 h-6 rounded-full text-black flex items-center justify-center">
      <span className="text-xs">
        {/* <IoMdFootball /> */}
        {reactIcons[sport]}
      </span>
    </div>
  );
};
SportIcon.propTypes = {
  sport: PropTypes.string,
};

export default SportIcon;
