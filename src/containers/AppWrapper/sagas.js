/**
 * App`s sagas
 * A place to inject sagas required by all pages
 */

import web3Sagas from '../Web3Guard/sagas'

export default [
  ...web3Sagas,
];

