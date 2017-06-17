/**
 * Gets posts from https://jsonplaceholder.typicode.com/
 */

import {put, call, takeLatest, select} from 'redux-saga/effects';
import {delay} from 'redux-saga'
import Web3 from 'web3';
import Promise from "bluebird";

import {isArraysEqual} from "../../utils/algo/compare";

import {
  WEB3__NETWORK_STATUS__SUCCESS,
  WEB3__NETWORK_STATUS__FAILURE,
  WEB3__ACCOUNTS_STATUS__SUCCESS,
  WEB3__PROVIDER_TYPE__INJECTED,
  // WEB3__PROVIDER_TYPE__TESTRPC,
  WEB3__INIT_CONNECTION,
  WEB3__LAUNCH_NETWORK_POLLING,
  WEB3__LAUNCH_ACCOUNTS_POLLING,
} from './constants';
import {
  web3ConnectionInitialized,
  web3ConnectionFailed,
  web3LaunchNetworkPolling,
  web3GetNetworkSuccess,
  web3GetNetworkFailure,
  web3LaunchAccountsPolling,
  web3GetAccountsSuccess,
  web3GetAccountsFailure,
} from './actions';
import {
  selectWeb3Accounts,
  selectWeb3Network,
} from './selectors';


////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 Watch for the changes in the connected network
 */

const configUpdateNetworkTimeout = 1000;  // update network every 0.5 seconds


export function* getWeb3NetworkRoutine() {
  while (true) {
    try {
      let getNetworkPromise = Promise.promisify(window.web3.version.getNetwork);
      let networkId         = yield call(getNetworkPromise);
      networkId             = Number.parseInt(networkId, 10);
      if (isNaN(networkId)) {
        //noinspection ExceptionCaughtLocallyJS
        throw new Error("Failed to query the Ethereum network ID");
      }

      // In fact - we duplicate reducer here
      // But we do not want to spam with not needed actions and, therefore, omit results of web3 request that do not change the store
      const web3Network = yield select(selectWeb3Network);
      if (web3Network.get('status') !== WEB3__NETWORK_STATUS__SUCCESS ||
        web3Network.get('networkId') !== networkId) {
        // emit action only if it change smth in the store
        yield put(web3GetNetworkSuccess(networkId));
      }
    } catch (err) {
      console.error(err);
      const web3Network = yield select(selectWeb3Network);
      if (web3Network.get('status') !== WEB3__NETWORK_STATUS__FAILURE ||
        web3Network.get('networkId') !== null) {
        // emit action only if it change smth in the store
        yield put(web3GetNetworkFailure(err));
      }
    }

    yield call(delay, configUpdateNetworkTimeout);
  }
}

export function* getWeb3NetworkSaga() {
  yield takeLatest(WEB3__LAUNCH_NETWORK_POLLING, getWeb3NetworkRoutine);
}


////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 Watch for the changes in list of accounts
 */

const configUpdateAccountsListTimeout = 1000;  // update list of accounts every 0.5 seconds


export function* getWeb3AccountsRoutine() {
  while (true) {
    try {
      let getAccountsPromise = Promise.promisify(window.web3.eth.getAccounts);
      const accounts         = yield call(getAccountsPromise);

      // In fact - we duplicate reducer here
      // But we do not want to spam with not needed actions and, therefore, omit results of web3 request that do not change the store
      const web3Accounts = yield select(selectWeb3Accounts);
      if (web3Accounts.get('status') !== WEB3__ACCOUNTS_STATUS__SUCCESS ||
        isArraysEqual(web3Accounts.get('accountsList').toJS(), accounts) === false) {
        // emit action only if it change smth in the store
        yield put(web3GetAccountsSuccess(accounts));
      }
    } catch (err) {
      yield put(web3GetAccountsFailure(err));
    }

    yield call(delay, configUpdateAccountsListTimeout);
  }
}

export function* getWeb3AccountsSaga() {
  yield takeLatest(WEB3__LAUNCH_ACCOUNTS_POLLING, getWeb3AccountsRoutine);
}


////////////////////////////////////////////////////////////////////////////////////////////////////


/*
 Initialization of the web3 environment on the app`s launch
 */


// uncomment for the local test network
//
// import truffleConfig from '../../../../escrower-contract/truffle.js'

export function* ethereumWeb3ConnectRoutine() {
  try {
    // uncomment for the local test network
    //
    // let web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`;
    // let web3Provider = new Web3.providers.HttpProvider(web3Location);
    // yield put(web3ConnectionInitialized(WEB3__PROVIDER_TYPE__TESTRPC, web3Provider));
    // yield put(web3GetAccounts());

    let web3 = window.web3;

    // replace with event listener
    for (let i = 0; i < 5; i++) {
      if (typeof web3 !== 'undefined') {
        break
      }
      yield call(delay, 1000);
    }

    if (typeof web3 !== 'undefined') {
      // replace current web3 object with the version we used during the development
      window.web3 = new Web3(web3.currentProvider);
      // put data into the store and launch polling for accounts and network changes
      yield put(web3ConnectionInitialized(WEB3__PROVIDER_TYPE__INJECTED, web3.currentProvider));
      yield put(web3LaunchNetworkPolling());
      yield put(web3LaunchAccountsPolling());
    } else {
      yield put(web3ConnectionFailed('No web3 provider detected'));
    }
  } catch (err) {
    yield put(web3ConnectionFailed(err));
  }
}

export function* ethereumWeb3ConnectSaga() {
  yield takeLatest(WEB3__INIT_CONNECTION, ethereumWeb3ConnectRoutine);
}


////////////////////////////////////////////////////////////////////////////////////////////////////


// All sagas to be loaded
export default [
  getWeb3NetworkSaga,
  getWeb3AccountsSaga,
  ethereumWeb3ConnectSaga,
];
