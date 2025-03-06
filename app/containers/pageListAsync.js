import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';

// Landing Page
export const Landing = loadable(() => import('./Landing'), {
  fallback: <Loading />,
});
// LoginPage Page
export const LoginPage = loadable(() => import('./Pages/LoginPage'), {
  fallback: <Loading />,
});

// Home Page
export const Home = loadable(() => import('./Pages/Home'), {
  fallback: <Loading />,
});
// CricketMarket Page
export const CricketMarket = loadable(() => import('./Pages/CricketMarket'), {
  fallback: <Loading />,
});
// FootballMarket Page
export const FootballMarket = loadable(() => import('./Pages/FootballMarket'), {
  fallback: <Loading />,
});
// TennisMarket Page
export const TennisMarket = loadable(() => import('./Pages/TennisMarket'), {
  fallback: <Loading />,
});
// InplayPage Page
export const InplayPage = loadable(() => import('./Pages/InplayPage'), {
  fallback: <Loading />,
});
// Cricket Page
export const Cricket = loadable(() => import('./Pages/Cricket'), {
  fallback: <Loading />,
});
// Football Page
export const Football = loadable(() => import('./Pages/Football'), {
  fallback: <Loading />,
});
// Tennis Page
export const Tennis = loadable(() => import('./Pages/Tennis'), {
  fallback: <Loading />,
});

// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});
