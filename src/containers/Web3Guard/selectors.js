/**
 * Selectors for the web3 api
 */

import {selectGlobal} from '../AppWrapper/selectors';

export const selectWeb3Global     = (state) => selectGlobal(state).get('web3global');
export const selectWeb3Connection = (state) => selectWeb3Global(state).get('web3Connection');
export const selectWeb3Network    = (state) => selectWeb3Global(state).get('web3Network');
export const selectWeb3Accounts   = (state) => selectWeb3Global(state).get('web3Accounts');
