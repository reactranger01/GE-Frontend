import './i18n';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './redux/reducers';
import rootSaga from './redux/rootSaga';
import {
  Cricket,
  CricketMarket,
  Football,
  InplayPage,
  Landing,
  NotFound,
  Tennis,
} from './containers/pageListAsync';
import NavbarNavigationPage from './containers/Pages/NavbarNavigation';

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
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<Cricket />} />
            <Route path="/football" element={<Football />} />
            <Route path="/tennis" element={<Tennis />} />
            <Route path="/inplay" element={<InplayPage />} />
            <Route
              path="/cricket-market/:eventId"
              element={<CricketMarket />}
            />
            <Route path="/football-market/:eventId" element={<InplayPage />} />
            <Route path="/tennis-market/:eventId" element={<InplayPage />} />
            <Route path="cricket-nav" element={<NavbarNavigationPage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </Provider>
  );
}

export default App;
