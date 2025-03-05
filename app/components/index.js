import React from 'react';
import loadable from '../utils/loadable';
import Loading from './Loading';

// Loading - No need to lazy load this component
export { default as Loading } from './Loading';
export { default as Navbar } from './Layout/Navbar';
export { default as LeftSidebar } from './LeftSidebar';
export { default as OuterHeading } from './OuterHeading';
export { default as OuterOdds } from './OuterOdds';
export { default as DateFormatter } from './DateFormatter';
export { default as DisableButton } from './DisableButton';

export const Welcome = loadable(() => import('./Welcome'), {
  fallback: <Loading />,
});
export const MatchOddsCricket = loadable(
  () => import('./Cricket/InnerMarketCricket/MatchOddsCricket'),
  {
    fallback: <Loading />,
  },
);
export const BookmakersCricket = loadable(
  () => import('./Cricket/InnerMarketCricket/BookmakersCricket'),
  {
    fallback: <Loading />,
  },
);
export const SessionsCricket = loadable(
  () => import('./Cricket/InnerMarketCricket/SessionsCricket'),
  {
    fallback: <Loading />,
  },
);
