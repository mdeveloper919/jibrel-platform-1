import React from 'react';
import {Link} from 'react-router';
import {browserHistory, withRouter} from 'react-router';

import MenuStructure from '../../global/MenuStructure';

import logo from './img/jibrel_logo.jpg';
import './style.css'


class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:      window.innerWidth,
      mobileNavVisible: false,
    };

    this.handleResize   = this.handleResize.bind(this);
    this.handleToggleMobileNavVisible = this.handleToggleMobileNavVisible.bind(this);
  };


  componentWillMount() {
    this.handleResize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
                    windowWidth:      window.innerWidth,
                    mobileNavVisible: this.state.mobileNavVisible && window.innerWidth <= 1000,
                  });
  }

  handleToggleMobileNavVisible() {
    this.setState({
                    mobileNavVisible: !this.state.mobileNavVisible,
                  });
  };

  renderDesktopNavigationLinks() {
    return MenuStructure.map((menuElement, i) => {
      let isActiveElement = (browserHistory.getCurrentLocation().pathname === menuElement.url);
      return (
        <Link to={menuElement.url} key={i}>
          <li
            className={isActiveElement ? "li-normal-click" : "li-normal"}
          >
            {menuElement.text}
          </li>
        </Link>
      );
    });
  }

  renderMobileNavigationLinks() {
    return MenuStructure.map((menuElement, i) => {
      let isActiveElement = (browserHistory.getCurrentLocation().pathname === menuElement.url);
      return (
        <Link to={menuElement.url} key={i} style={{textDecoration: 'none'}}>
          <li
            className={isActiveElement ? "li-mobile-click" : "li-mobile"}
            onClick={() => {this.handleToggleMobileNavVisible()}}
          >
            {menuElement.text}
          </li>
        </Link>
      );
    });
  }

  renderNavigation() {
    if (this.state.windowWidth <= 1000) {
      return (
        <div className="mobile">
          {
            this.state.mobileNavVisible ? (
              <div>
                <i onClick={e => this.handleToggleMobileNavVisible(e)} className="fa fa-times fa-1x" aria-hidden="true"></i>
                <li className="mobile-center" onClick={() => this.logoClick()}><Link
                  style={{textDecoration: 'none', color: '#a9a9a9'}} to="/">jibrel network</Link></li>
              </div>
            ) : (
              <div>
                <i onClick={e => this.handleToggleMobileNavVisible(e)} className="fa fa-bars fa-1x" aria-hidden="true"></i>
                <li className="mobile-center" onClick={() => this.logoClick()}><Link
                  style={{textDecoration: 'none', color: '#a9a9a9'}} to="/">jibrel network</Link></li>
              </div>
            )
          }
          <ul className="nav-mobile"
              style={this.state.mobileNavVisible ? {backgroundColor: '#ffffff', height: window.innerHeight} : null}
          >
            {this.state.mobileNavVisible && this.renderMobileNavigationLinks()}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="nav_normal">
          <ul>
            <li
              className="li-logo"
              style={{marginRight: this.state.windowWidth <= 1200 && '9%'}}
            >
              <Link to="/">
                <img src={logo} alt=""/>
                <span className="logo-text">jibrel<br/>network</span>
              </Link>
            </li>
            {this.renderDesktopNavigationLinks()}
            <li className="li-right" style={{marginLeft: this.state.windowWidth <= 1200 && '7%'}}>FUNDRAISER</li>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        {this.renderNavigation()}
      </nav>
    );
  }
}

export default withRouter(Header);

