/*
 * AppReducer
 * A place to add reducers used by all pages
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import globalWeb3Reducer from '../Web3Guard/reducer';


// The initial state of the App
const initialState = fromJS({});

function appReducer(state = initialState) {
  return state;
}

export default combineReducers({
    app: appReducer,
    web3global: globalWeb3Reducer,
  });
