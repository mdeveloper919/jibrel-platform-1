/**
 * Selectors for the Jibrel API config
 */

import {createSelector} from 'reselect';

import {selectGlobal} from '../AppWrapper/selectors';
import {selectWeb3Network} from '../Web3Guard/selectors';


export const selectJibrelAPIConfig           = (state) => selectGlobal(state).get('JibrelAPIConfig');
export const selectJibrelAPIContracts        = (state) => selectJibrelAPIConfig(state).get('contracts');
export const selectJibrelAPICurrentConfig    = createSelector(
  selectJibrelAPIContracts,
  selectWeb3Network,
  (contractsConfig, web3Network) => {
    for (let i = 0; i < contractsConfig.size; i++) {
      if (contractsConfig.get(i).get("networkId") === web3Network.get('networkId')) {
        return contractsConfig.get(i).toJS();
      }
    }
    return null;
  }
);
export const selectJibrelSupportedNetworkIds = createSelector(
  selectJibrelAPIContracts,
  (contractsConfig) => {
    let result = [];
    for (let i = 0; i < contractsConfig.size; i++) {
      result.push(contractsConfig.get(i).get("networkId"));
    }
    return result;
  }
);
