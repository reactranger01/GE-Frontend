import React from 'react';
import PropTypes from 'prop-types';

const Premium = ({ premiumData }) => {
  // Extract slice1 and slice2 data from the object
  const slice1 = premiumData[0]?.slice1 || [];
  const slice2 = premiumData[1]?.slice2 || [];

  return (
    <div className="bg-black text-black p-2 cursor-pointer">
      {/* First Section (slice1 - 2 items) */}
      <div className="flex gap-2 whitespace-nowrap">
        {slice1.map((item, index) => (
          <div
            key={index}
            className={`px-16 py-1 rounded-lg font-semibold text-black ${
              index === 0
                ? 'bg-[#ffc21cff]'
                : 'bg-purple-700 hover:bg-[#ffc21cff]'
            }`}
          >
            {item.text}
            {index === 1 && (
              <span className="ml-2 blink-animation bg-[#8000ffff]">New!</span>
            )}
          </div>
        ))}
      </div>

      {/* Second Section (slice2 - 5 items) */}
      <div className="mt-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="flex gap-2 pb-2">
          {slice2.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-12 py-1 rounded-lg font-semibold text-black ${
                index === 0
                  ? 'bg-[#ffc21cff]'
                  : 'bg-purple-700 hover:bg-[#ffc21cff]'
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Premium.propTypes = {
  premiumData: PropTypes.arrayOf(
    PropTypes.shape({
      slice1: PropTypes.arrayOf(PropTypes.object),
      slice2: PropTypes.arrayOf(PropTypes.object),
    }),
  ).isRequired,
};

export default Premium;
