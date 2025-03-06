import React from 'react';
import PropTypes from 'prop-types'; // Don't forget to import PropTypes
// import { FaTv } from 'react-icons/fa';
// import { FaGamepad } from 'react-icons/fa';
// eslint-disable-next-line
const FeatureIcons = ({ data }) => {
  return (
    <div className="flex gap-2 items-center">
      {/* {features.includes('live') && ( */}
      <div className="w-2 h-2 rounded-full bg-green-500" />
      {/* )} */}
      {/* {features.includes('tv') && <FaTv className="w-4 h-4 text-black" />}
      {features.includes('betting') && (
        <span className="text-xs font-bold text-black">BM</span>
      )}
      {features.includes('game') && (
        <FaGamepad className="w-4 h-4 text-black" />
      )} */}
    </div>
  );
};

// Fix propTypes declaration to match the component name (FeatureIcons)
FeatureIcons.propTypes = {
  data: PropTypes.array,
};

export default FeatureIcons;
