import { IoMdFootball } from 'react-icons/io';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Monitor, Gamepad } from 'lucide-react';
import FeatureIcons from '../Common/FeatureIcons';

const sampleData = [
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
  {
    id: 1,
    game: 'Dubai Capitals v Desert Vipers',
    datetime: 'Feb 09 2025 19:30 (IST)',
    sport: 'cricket',
    features: ['live', 'tv', 'betting'],
    odds: {
      1: { blue: '5', pink: '5.2' },
      X: { blue: '-', pink: '-' },
      2: { blue: '1.24', pink: '1.25' },
    },
  },
];

const SportIcon = ({ sport }) => {
  return (
    <div className="w-6 h-6 rounded-full text-black flex items-center justify-center">
      <span className="text-xs">
        <IoMdFootball />
      </span>
    </div>
  );
};

const ThirdComponent = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Header */}
      <div className="grid grid-cols-15 gap-0 mb-2 items-center">
        <div className="col-span-8 px-4 py-2 text-sm font-bold text-black">
          Game
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-2 text-center text-sm font-bold text-black">
          1
        </div>
        <div className="col-span-2 text-center text-sm font-bold text-black">
          X
        </div>
        <div className="col-span-2 text-center text-sm font-bold text-black">
          2
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        {sampleData.map((match) => (
          <div
            key={match.id}
            className="grid grid-cols-15 gap-0 border-t items-center"
          >
            {/* Game Info - 8 columns */}
            <div className="col-span-8 px-4 py-2">
              <div className="flex items-center  text-black">
                <div className="flex-shrink-0">
                  <SportIcon sport={match.sport} />
                </div>
                <div className="flex items-center gap-4 hover:underline cursor-pointer">
                  <div className="font-medium truncate text-black">
                    {match.game}
                  </div>
                  <div className="text-sm text-black whitespace-nowrap">
                    {match.datetime}
                  </div>
                </div>
              </div>
            </div>

            {/* Features - 1 column */}
            <div className="col-span-1 text-black">
              <FeatureIcons features={match.features} />
            </div>

            {/* Odds - 6 columns (2 columns each for 1, X, 2) */}
            <div className="col-span-2 grid grid-cols-2 cursor-pointer">
              <div className="bg-[#73bcf0] px-4 py-2 text-center text-black">
                {match.odds['1'].blue}
              </div>
              <div className="bg-[#faaabb] px-4 py-2 text-center text-black">
                {match.odds['1'].pink}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 cursor-pointer">
              <div className="bg-[#73bcf0] px-4 py-2 text-center text-black">
                {match.odds['X'].blue}
              </div>
              <div className="bg-[#faaabb] px-4 py-2 text-center text-black">
                {match.odds['X'].pink}
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 cursor-pointer">
              <div className="bg-[#73bcf0] px-4 py-2 text-center text-black">
                {match.odds['2'].blue}
              </div>
              <div className="bg-[#faaabb] px-4 py-2 text-center text-black">
                {match.odds['2'].pink}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdComponent;
