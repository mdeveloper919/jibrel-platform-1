/**
 * JibrelGlobal selectors
 */

import {selectGlobal} from '../AppWrapper/selectors';

export const selectJibrelGlobalData = (state) => selectGlobal(state).get('JibrelGlobal');
export const selectJibrelCrydrList  = (state) => selectJibrelGlobalData(state).get('crydrList').toJS();
