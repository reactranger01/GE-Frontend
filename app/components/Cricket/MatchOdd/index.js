import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Info, X } from 'lucide-react';

const MatchOdd = ({ game, cashout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="flex justify-between items-center w-full h-auto bg-[#8000ffff] text-white p-1">
      {/* Left Side: Game Name + Conditional CashOut */}
      <div className="flex items-center gap-4">
        <h2 className="text-[13px] font-normal md:text-14 md:font-bold">
          {game}
        </h2>
        {cashout && (
          <div className="hidden md:block bg-[#ffc21cff] text-[#000000ff] px-3 md:px-2  rounded-md uppercase text-sm font-semibold">
            {cashout}
          </div>
        )}
      </div>

      {/* Right Side: Info Icon */}
      <button onClick={() => setIsOpen(true)}>
        <Info className="w-6 h-6 cursor-pointer" />
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[80%] max-w-4xl rounded-lg shadow-lg mt-4">
            {/* Header (Black Navbar Style) */}
            <div className="bg-black text-white flex justify-between items-center px-6 py-3 rounded-t-lg">
              <h3 className="text-lg font-bold">Match Rules</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Rules Content */}
            <div className="p-6 bg-gray-100 text-black">
              <p className="text-sm">1. Lorem ipsum dolor sit amet.</p>
              <p className="text-sm">2. Consectetur adipiscing elit.</p>
              <p className="text-sm">3. Sed do eiusmod tempor incididunt.</p>
              <p className="text-sm">4. Ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MatchOdd.propTypes = {
  game: PropTypes.string.isRequired,
  cashout: PropTypes.string,
};

export default MatchOdd;
