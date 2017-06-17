/**
 * Sagas to work with Jibrel API
 */

import {select, call} from 'redux-saga/effects';
import Promise from "bluebird";

import {selectJibrelAPICurrentConfig} from '../JibrelAPIConfig/selectors';


export function* fetchCrydrList(web3) {
  const apiConfig = yield select(selectJibrelAPICurrentConfig);
  if (apiConfig === null) {
    console.error("Unable to load CryDR list for unknown network");
    return "[]";
  }

  let apiContract         = web3.eth.contract(apiConfig.apiABI);
  let apiContractInstance = apiContract.at(apiConfig.apiAddress);

  let getCryDRRepositoryPromise = Promise.promisify(apiContractInstance.getCryDRRepository.call);
  let crydrRepoAddress          = yield call(getCryDRRepositoryPromise);

  let crydrRepoContract         = web3.eth.contract(apiConfig.crydrRepoABI);
  let crydrRepoContractInstance = crydrRepoContract.at(crydrRepoAddress);

  let getCryDRDataPromise = Promise.promisify(crydrRepoContractInstance.getCryDRData.call);
  let crydrData           = yield call(getCryDRDataPromise);

  return JSON.parse(crydrData);
}

export function* fetchCrydrLicenseName(web3, crydrAddress) {

}
