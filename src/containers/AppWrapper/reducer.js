/*
 * AppReducer
 * A place to add reducers used by all pages
 */

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({});

function appReducer(state = initialState, action) {
  return state;
}

export default appReducer;
