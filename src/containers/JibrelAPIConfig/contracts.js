/**
 * Smart contracts used by the Jibrel API
 */

import ERC20ABI from './abi/ERC20ABI.json';
import JibrelAPIABI from './abi/JibrelAPIABI.json';
import CryDRRepoABI from './abi/CryDRRepoABI.json';


const jibrelAPIContracts = [
  {
    networkId:    3,
    apiABI:       JibrelAPIABI,
    apiAddress:   '0x0',
    crydrRepoABI: CryDRRepoABI,
    ERC20ABI:     ERC20ABI
  },
  {
    // private test network
    networkId:    100,
    apiABI:       JibrelAPIABI,
    apiAddress:   '0x735a1004cfafa290d96040385f3995aff9921bcf',
    crydrRepoABI: CryDRRepoABI,
    ERC20ABI:     ERC20ABI
  }
];

export default jibrelAPIContracts;
