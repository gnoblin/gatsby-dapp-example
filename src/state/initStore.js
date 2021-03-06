/* global window:true */
/* eslint no-underscore-dangle: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { drizzleOptions } from 'src/constants';
import { rootReducer } from 'src/reducers';
import { rootSaga } from 'src/sagas';
import { generateContractsInitialState } from 'src/lib/generateContractsInitialState';

export const __DEV__ = process.env.NODE_ENV === "develop";

let initialState = {};

initialState = {
  contracts: generateContractsInitialState(drizzleOptions),
}

const sagaMiddleware = createSagaMiddleware();

const prodMiddlewares = [
  sagaMiddleware,
];

const devMiddlewares = [
  sagaMiddleware,  
];

export const initStore = () => {
  const store = createStore(
    rootReducer, 
    initialState, 
    compose(
      applyMiddleware(
        ...devMiddlewares,
      )
    )
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  // run the rootSaga initially
  store.runSagaTask();

  return store;
};
