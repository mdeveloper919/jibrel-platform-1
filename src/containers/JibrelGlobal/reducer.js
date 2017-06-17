/*
 * Reducer for fetching deal`s data
 */

import {fromJS} from 'immutable';

import {
  API_REQUEST_STATUS__ROUTINE_NOT_INITIALIZED,
  API_REQUEST_STATUS__ROUTINE_LAUNCHED,
  API_REQUEST_STATUS__ROUTINE_SUCCESS,
  API_REQUEST_STATUS__ROUTINE_FAILURE,
} from '../../utils/apirequest/constants';

import {
  FETCH_CRYDR_LIST__START_ROUTINE,
  FETCH_CRYDR_LIST__SUCCESS,
  FETCH_CRYDR_LIST__FAILURE,
} from './constants';


const initialState = fromJS({
                              crydrList: {
                                routineStatus: API_REQUEST_STATUS__ROUTINE_NOT_INITIALIZED,
                                data:          [],
                                error:         null,
                              }
                            });

function jibrelGlobalDataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CRYDR_LIST__START_ROUTINE: {
      let newCrydrListEntry = state.get("crydrList")
                                   .set("routineStatus", API_REQUEST_STATUS__ROUTINE_LAUNCHED)
                                   .set("error", null);
      return state.set("crydrList", newCrydrListEntry);
    }
    case FETCH_CRYDR_LIST__SUCCESS: {

      let newCrydrListEntry = state.get("crydrList")
                                   .set("routineStatus", API_REQUEST_STATUS__ROUTINE_SUCCESS)
                                   .set("data", action.crydrListData);
      return state.set("crydrList", newCrydrListEntry);
    }
    case FETCH_CRYDR_LIST__FAILURE: {
      let newCrydrListEntry = state.get("crydrList")
                                   .set("routineStatus", API_REQUEST_STATUS__ROUTINE_FAILURE)
                                   .set("error", action.error);
      return state.set("crydrList", newCrydrListEntry);
    }

    default:
      return state;
  }
}

export default jibrelGlobalDataReducer;
