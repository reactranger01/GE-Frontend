import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';

// Landing Page
export const Landing = loadable(() => import('./Landing'), {
  fallback: <Loading />,
});
// Home Page
export const Home = loadable(() => import('./Pages/Home'), {
  fallback: <Loading />,
});
// Cricket Page
export const Cricket = loadable(() => import('./Pages/Cricket'), {
  fallback: <Loading />,
});

// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});
