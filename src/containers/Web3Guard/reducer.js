/*
 * Ethereum`s web3 reducer
 */

import {fromJS} from 'immutable';

import {isArraysEqual} from "../../utils/algo/compare";

import {
  WEB3__CONNECTION_STATUS__NOT_INITIALIZED,
  WEB3__CONNECTION_STATUS__CONNECTION_ATTEMPT,
  WEB3__CONNECTION_STATUS__SUCCESS,
  WEB3__CONNECTION_STATUS__FAILURE,
  WEB3__NETWORK_STATUS__NOT_INITIALIZED,
  WEB3__NETWORK_STATUS__REQUEST_SENT,
  WEB3__NETWORK_STATUS__SUCCESS,
  WEB3__NETWORK_STATUS__FAILURE,
  WEB3__ACCOUNTS_STATUS__NOT_INITIALIZED,
  WEB3__ACCOUNTS_STATUS__REQUEST_SENT,
  WEB3__ACCOUNTS_STATUS__SUCCESS,
  WEB3__ACCOUNTS_STATUS__FAILURE,
  WEB3__INIT_CONNECTION,
  WEB3__CONNECTION_INITIALIZED,
  WEB3__CONNECTION_FAILED,
  WEB3__LAUNCH_NETWORK_POLLING,
  WEB3__NETWORK_SUCCESS,
  WEB3__NETWORK_FAILURE,
  WEB3__LAUNCH_ACCOUNTS_POLLING,
  WEB3__ACCOUNTS_SUCCESS,
  WEB3__ACCOUNTS_FAILURE,
} from './constants';


const initialState = fromJS({
                              web3Connection: {
                                status:       WEB3__CONNECTION_STATUS__NOT_INITIALIZED,
                                providerType: null,
                                error:        null,
                              },
                              web3Network:    {
                                status:    WEB3__NETWORK_STATUS__NOT_INITIALIZED,
                                networkId: null,
                                error:     null,
                              },
                              web3Accounts:   {
                                status:       WEB3__ACCOUNTS_STATUS__NOT_INITIALIZED,
                                accountsList: [],
                              },
                            });

function globalWeb3Reducer(state = initialState, action) {
  switch (action.type) {
    case WEB3__INIT_CONNECTION: {
      return state.set('web3Connection', fromJS({
                                                  status:       WEB3__CONNECTION_STATUS__CONNECTION_ATTEMPT,
                                                  providerType: null,
                                                  error:        null,
                                                }));
    }
    case WEB3__CONNECTION_INITIALIZED: {
      return state.set('web3Connection', fromJS({
                                                  status:       WEB3__CONNECTION_STATUS__SUCCESS,
                                                  providerType: action.web3ProviderType,
                                                  error:        null,
                                                }));
    }
    case WEB3__CONNECTION_FAILED: {
      return state.set('web3Connection', fromJS({
                                                  status:       WEB3__CONNECTION_STATUS__FAILURE,
                                                  providerType: null,
                                                  error:        action.error,
                                                }));
    }


    case WEB3__LAUNCH_NETWORK_POLLING: {
      return state.set('web3Network', fromJS({
                                               status:    WEB3__NETWORK_STATUS__REQUEST_SENT,
                                               networkId: null,
                                               error:     null,
                                             }));
    }
    case WEB3__NETWORK_SUCCESS: {
      if (state.get('web3Network').get('status') === WEB3__NETWORK_STATUS__SUCCESS &&
        state.get('web3Network').get('networkId') === action.networkId) {
        return state;
      }
      return state.set('web3Network', fromJS({
                                               status:    WEB3__NETWORK_STATUS__SUCCESS,
                                               networkId: action.networkId,
                                               error:     null,
                                             }));
    }
    case WEB3__NETWORK_FAILURE: {
      if (state.get('web3Network').get("status") === WEB3__NETWORK_STATUS__FAILURE &&
        state.get('web3Network').get("networkId") === null
      ) {
        return state;
      }
      return state.set('web3Network', fromJS({
                                               status:    WEB3__NETWORK_STATUS__FAILURE,
                                               networkId: null,
                                               error:     action.error,
                                             }));
    }


    case WEB3__LAUNCH_ACCOUNTS_POLLING: {
      return state.set('web3Accounts', fromJS({
                                                status:       WEB3__ACCOUNTS_STATUS__REQUEST_SENT,
                                                accountsList: [],
                                              }));
    }
    case WEB3__ACCOUNTS_SUCCESS: {
      if (state.get('web3Accounts').get('status') === WEB3__ACCOUNTS_STATUS__SUCCESS &&
        isArraysEqual(state.get('web3Accounts').get('accountsList').toJS(), action.web3Accounts)) {
        return state;
      }
      return state.set('web3Accounts', fromJS({
                                                status:       WEB3__ACCOUNTS_STATUS__SUCCESS,
                                                accountsList: action.web3Accounts,
                                              }));
    }
    case WEB3__ACCOUNTS_FAILURE: {
      return state.set('web3Accounts', fromJS({
                                                status:       WEB3__ACCOUNTS_STATUS__FAILURE,
                                                accountsList: [],
                                              }));
    }


    default:
      return state;
  }
}

export default globalWeb3Reducer;
