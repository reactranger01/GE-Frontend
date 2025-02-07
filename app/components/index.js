import React from 'react';
import loadable from '../utils/loadable';
import Loading from './Loading';

// Loading - No need to lazy load this component
export { default as Loading } from './Loading';
export { default as Navbar } from './Layout/Navbar';
export { default as Footer } from './Layout/Footer';

export const Welcome = loadable(() => import('./Welcome'), {
  fallback: <Loading />,
});
