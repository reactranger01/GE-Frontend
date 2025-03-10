import './i18n';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';

import createSagaMiddleware from 'redux-saga';
import createReducer from './redux/reducers';
import rootSaga from './redux/rootSaga';
import {
  Cricket,
  CricketMarket,
  Football,
  FootballMarket,
  InplayPage,
  Landing,
  LoginPage,
  NotFound,
  Tennis,
  TennisMarket,
} from './containers/pageListAsync';
import NavbarNavigationPage from './containers/Pages/NavbarNavigation';
import ScrollToTop from './ScrollToTop';

const sagaMiddleware = createSagaMiddleware();
const reducer = createReducer();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Landing />}>
            <Route index element={<Cricket />} />
            <Route path="/football" element={<Football />} />
            <Route path="/tennis" element={<Tennis />} />
            <Route path="/inplay" element={<InplayPage />} />
            <Route
              path="/cricket-market/:eventId"
              element={<CricketMarket />}
            />
            <Route
              path="/football-market/:eventId"
              element={<FootballMarket />}
            />
            <Route path="/tennis-market/:eventId" element={<TennisMarket />} />
            <Route path="cricket-nav" element={<NavbarNavigationPage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
}

export default App;
