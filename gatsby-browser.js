/* globals window */

import React from 'react';
// import { hydrate } from 'emotion';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleProvider } from 'drizzle-react';
import createStore from './src/state/createStore';
import { drizzleOptions } from './src/state/drizzleOptions';
import { setDrizzleAction } from './src/state/reducer/actions';

exports.replaceRouterComponent = ({ history }) => {
  const store = createStore();
  const drizzleStore = generateStore(drizzleOptions);
  const drizzle = new Drizzle(drizzleOptions, drizzleStore);
  console.log(store);
  // console.log(drizzle);
  
  // store.dispatch(setDrizzleAction(drizzle));

  const ConnectedRouterWrapper = ({ children }) => (
    <DrizzleProvider options={drizzleOptions}>
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    </DrizzleProvider>
  );

  return ConnectedRouterWrapper;
};

// exports.onClientEntry = () => {
//   if (
//     /* eslint-disable no-underscore-dangle */
//     typeof window !== `undefined` &&
//     typeof window.__EMOTION_CRITICAL_CSS_IDS__ !== `undefined`
//   ) {
//     hydrate(window.__EMOTION_CRITICAL_CSS_IDS__);
//   }
// };