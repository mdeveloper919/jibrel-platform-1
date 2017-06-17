/*
 * JibrelGlobal actions
 */

import {
  FETCH_CRYDR_LIST__START_ROUTINE,
  FETCH_CRYDR_LIST__SUCCESS,
  FETCH_CRYDR_LIST__FAILURE,
} from './constants';


////////////////////////////////////////////////////////////////////////////////////////////////////


export function fetchCrydrListStartRoutine() {
  return {
    type: FETCH_CRYDR_LIST__START_ROUTINE,
  };
}

export function fetchCrydrListSuccess(crydrListData) {
  return {
    type: FETCH_CRYDR_LIST__SUCCESS,
    crydrListData,
  };
}

export function fetchCrydrListFailure(error) {
  return {
    type: FETCH_CRYDR_LIST__FAILURE,
    error,
  };
}
