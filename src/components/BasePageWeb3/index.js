import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
  WEB3__CONNECTION_STATUS__SUCCESS,
  WEB3__ACCOUNTS_STATUS__SUCCESS,
} from '../../containers/Web3Guard/constants';
import {selectWeb3Global} from '../../containers/Web3Guard/selectors';
import{selectJibrelSupportedNetworkIds} from '../../containers/JibrelAPIConfig/selectors'
import ETHEREUM_NETWORK_INFO from '../../utils/EthUtils/NetworksInfo';

import BasePage from '../BasePage';

const metaMaskUrl = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";


class BasePageWeb3 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (this.props.web3Global.get('web3Connection').get('status') !== WEB3__CONNECTION_STATUS__SUCCESS) {
      return (
        <BasePage>
          <span>
            No connection to the Ethereum network.<br/>
            Please, install <a href={metaMaskUrl} target="_blank" rel="noopener noreferrer">MetaMask</a>
          </span>
        </BasePage>
      );
    }

    if (this.props.escrowerSupportedNetworkIds.includes(this.props.web3Global.get('web3Network').get('networkId')) === false) {
      let currentNetworkId   = this.props.web3Global.get('web3Network').get('networkId');
      let currentNetworkName = null;
      for (let i = 0; i < ETHEREUM_NETWORK_INFO.length; i++) {
        if (ETHEREUM_NETWORK_INFO[i].networkId === currentNetworkId) {
          currentNetworkName = ETHEREUM_NETWORK_INFO[i].networkName;
        }
      }

      return (
        <BasePage>
          <span>
            {
              currentNetworkName === null ?
              <span>Current Ethereum network not supported</span> :
              <span>Current Ethereum network not supported: {currentNetworkName}</span>
            }
            <br/>
            Supported networks:
            <br/>
            {this.props.escrowerSupportedNetworkIds.map((networkId) => {
              for (let i = 0; i < ETHEREUM_NETWORK_INFO.length; i++) {
                if (ETHEREUM_NETWORK_INFO[i].networkId === networkId) {
                  return (<li key={networkId}>{ETHEREUM_NETWORK_INFO[i].networkName} (id {networkId})</li>);
                }
              }
              return (<li key={networkId}>Network with the id {networkId}</li>);
            })}
            <br/>
            <span>Please, check MetaMask settings and network connection</span>
          </span>
        </BasePage>
      );
    }

    if (this.props.web3Global.get('web3Accounts').get('status') !== WEB3__ACCOUNTS_STATUS__SUCCESS ||
      this.props.web3Global.get('web3Accounts').get('accountsList').toJS().length === 0) {
      return (
        <BasePage>
          <span>
            We have connection to the Ethereum network<br/>
            But no loaded Ethereum accounts detected<br/>
            Please, unlock MetaMask
          </span>
        </BasePage>
      );
    }

    return (
      <BasePage>
        { this.props.children }
      </BasePage>
    );
  }
}


BasePageWeb3.propTypes = {
  web3Global:                  PropTypes.any,
  escrowerSupportedNetworkIds: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
                                                   web3Global:                  selectWeb3Global,
                                                   escrowerSupportedNetworkIds: selectJibrelSupportedNetworkIds,
                                                 });

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePageWeb3);
