import React from 'react';
import PropTypes from 'prop-types';

const Sessions = ({ sessions }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Grid Container */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Headers */}
        <div className="col-span-3"></div>
        <div className="bg-[#faaabb] p-1 text-center font-semibold text-[#000000]">
          No
        </div>
        <div className="bg-[#73bcf0] p-1 text-center font-semibold text-[#000000]">
          Yes
        </div>

        {/* Sessions Data */}
        {sessions.map((session) => (
          <React.Fragment key={session.name}>
            {/* Session Name */}
            <div className="col-span-3 p-2 font-medium bg-gray-100 text-[#000000]">
              {session.name}
            </div>

            {/* No Column */}
            <div className="bg-[#faaabb] text-center py-2">
              <div className="font-bold text-[#000000]">{session.no}</div>
              <div className="text-sm text-[#000000]">100</div>
            </div>

            {/* Yes Column */}
            <div className="bg-[#73bcf0] text-center py-2">
              <div className="font-bold text-[#000000]">{session.yes}</div>
              <div className="text-sm text-[#000000]">100</div>
            </div>

            {/* Min/Max Values */}
            <div className="col-span-2 flex items-center">
              <span className="text-xs text-[#000000] bg-gray-100 ml-2">
                Min: {session.min}
              </span>
              <span className="text-xs text-[#000000] bg-gray-100 ml-2">
                Max: {session.max}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

Sessions.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      no: PropTypes.string.isRequired,
      yes: PropTypes.string.isRequired,
      min: PropTypes.string.isRequired,
      max: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Sessions;
