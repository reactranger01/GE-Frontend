import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSportsCricket } from 'react-icons/md';
import { motion } from 'framer-motion';

const items = [
  { name: 'Sri Lanka vs Australia', path: '/cricket-market' },
  { name: 'India vs England', path: '/page2' },
  { name: 'Bangladesh vs UAE', path: '/page3' },
  { name: 'South Africa vs Pakistan', path: '/page4' },
  { name: 'Dubai Capitals vs Desert Vipers', path: '/page5' },
  { name: 'Macarthur FC vs Western United', path: '/page6' },
  { name: 'New Zealand vs South Africa', path: '/page7' },
  { name: 'Alcaraz vs Alex de Minaur', path: '/page8' },
  { name: 'A Potapova vs L Bronzettic', path: '/page9' },
  { name: 'Plymouth vs Liverpool', path: '/page12' },
];

const TopComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      {/* Add a container with padding to ensure scrollbar visibility */}
      <div className="px-4 pl-0">
        {/* Add a wrapper with overflow settings */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {/* Remove right padding from flex container to show last element */}
          <div className="flex gap-2 pb-8 min-w-min">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 text-white font-bold text-lg px-4 py-2 bg-purple-600 rounded-md whitespace-nowrap hover:bg-purple-700 transition-colors"
              >
                <motion.span
                  className="flex items-center gap-2"
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                >
                  <MdSportsCricket size={24} />
                  <span>{item.name}</span>
                </motion.span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopComponent;
