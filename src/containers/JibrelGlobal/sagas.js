/**
 * JibrelGlobal sagas
 */


import {takeLatest, put, call} from 'redux-saga/effects';

import {WEB3__NETWORK_SUCCESS,} from '../Web3Guard/constants';
import {fetchCrydrList} from '../JibrelAPI/sagas';

import {FETCH_CRYDR_LIST__START_ROUTINE,} from './constants';
import {fetchCrydrListSuccess, fetchCrydrListFailure} from './actions';


////////////////////////////////////////////////////////////////////////////////////////////////////

export function* fetchCrydrListSaga() {
  try {
    let crydrList = yield call(fetchCrydrList, window.web3);
    yield put(fetchCrydrListSuccess(crydrList));
  } catch (err) {
    console.error(err);
    yield put(fetchCrydrListFailure(err));
  }
}

export function* fetchCrydrListFlow() {
  yield takeLatest([WEB3__NETWORK_SUCCESS, FETCH_CRYDR_LIST__START_ROUTINE],
                   fetchCrydrListSaga);
}


////////////////////////////////////////////////////////////////////////////////////////////////////

export default [
  fetchCrydrListFlow,
];
