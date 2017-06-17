import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory, withRouter} from 'react-router';
import {createStructuredSelector} from 'reselect';

import BasePageWeb3 from '../../components/BasePageWeb3';
import EtherscanLink from '../../components/EtherscanLink';

import {fetchCrydrListStartRoutine} from '../JibrelGlobal/actions'
import {selectJibrelCrydrList} from '../JibrelGlobal/selectors'


class CrydrListPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderCrydrList = this.renderCrydrList.bind(this);
  }

  componentDidMount() {
    const crydrSymbol = this.props.params.crydrSymbol;

    // fetchMessage(id, function (err, message) {
    //   this.setState({ message: message })
    // })
  }

  renderCrydrList() {
    let currentPath = browserHistory.getCurrentLocation().pathname;
    return this.props.crydrList.data.map((crydrElement, index) => {
      return (
        <div key={index}>
          Address: <EtherscanLink entityType="address" entityHash={crydrElement.address}/><br/>
          Name: {crydrElement.name}<br/>
          Symbol: {crydrElement.symbol}<br/>
          <Link to={currentPath + "/" + crydrElement.symbol}>Details</Link>
        </div>
      );
    })
  }

  render() {
    return (
      <BasePageWeb3>
        {this.renderCrydrList()}
      </BasePageWeb3>
    );
  }
}


CrydrListPage.propTypes = {
  actions:   PropTypes.any,
  crydrList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
                                                   crydrList: selectJibrelCrydrList
                                                 });

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchCrydrListStartRoutine}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CrydrListPage));

