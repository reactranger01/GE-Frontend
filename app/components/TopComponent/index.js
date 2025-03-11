import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSportsCricket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mui/material';

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
const items2 = [
  { name: 'INPLAY', path: '/' },
  { name: 'SPORTS', path: '/' },
  { name: 'CASINO', path: '/' },
  { name: 'SPORTS BOOK', path: '/' },
  { name: 'OTHERS', path: '/' },
];

const TopComponent = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <>
      {isMobile ? (
        <>
          <div className="w-full bg-black">
            <div className="">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <div className="flex gap-2 md:pb-8 pb-2 min-w-max">
                  {items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(item.path)}
                      className="flex items-center gap-2 text-white font-bold text-12 px-2  bg-purple-600 rounded-md whitespace-nowrap hover:bg-purple-700 transition-colors"
                    >
                      <motion.span
                        className="flex items-center gap-1"
                        animate={{
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                        }}
                      >
                        <img
                          src="/images/cricketIcon.png"
                          alt=""
                          className="w-3"
                        />
                        <span>{item.name}</span>
                      </motion.span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black grid grid-cols-5 py-2   ">
            {items2?.map((item, index) => (
              <div
                className={` ${
                  index !== items2.length - 1 ? 'border-r border-white' : ''
                } `}
                key={index}
              >
                <div className="text-12 font-bold text-white text-center">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
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
      )}
    </>
  );
};

export default TopComponent;
