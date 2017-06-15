import React from 'react';

import Images from './images';
import './style.css';


class FooterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:      window.innerWidth,
      mobileNavVisible: false,
    };

    this.handleResize   = this.handleResize.bind(this);
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

  render() {
    if (this.state.windowWidth <= 1000) {
      return <div className="footer_normal">
        <div className="september_div">
          <li style={{fontSize: 22}}>COMING SEPTEMBER2017</li>
          <div className="mobile_icon_div">
            <div className="apple_icon_div"><img src={Images.apple} alt=""/></div>
            <div className="apple_icon_div"><img src={Images.android_logo} alt=""/></div>
          </div>
          <div className="button_div">
            <div className="apple_button" style={{width: window.innerWidth * 7 / 10}}>
              <li style={{fontSize: 14}}>CONTRIBUTE TO OUR CODE</li>
            </div>
            <div className="apple_button" style={{width: window.innerWidth * 7 / 10}}>
              <li style={{fontSize: 14}}>PARTICIPATE IN OUR FUNDRAISER</li>
            </div>
          </div>
        </div>
        <div className="footer_div">
          <div className="footer_view">
            <li>COMMUNITY</li>
          </div>
          <div className="footer_icon">
            <div className="footer_icon_div"><img src={Images.reddit_character} alt=""/>
              <li>REDDIT</li>
            </div>
            <div className="footer_icon_div"><img src={Images.reddit_character} alt=""/>
              <li>STEEMIT</li>
            </div>
            <div className="footer_icon_div"><img src={Images.bitcoin_logo} alt=""/>
              <li>BITCOINTALK</li>
            </div>
            <div className="footer_icon_div"><img src={Images.slack_symbol_1} alt=""/>
              <li>SLACK</li>
            </div>
            <div className="footer_icon_div"><img src={Images.twitter_logo_1} alt=""/>
              <li>TWITTER</li>
            </div>
          </div>
        </div>
      </div>
        ;
    } else {
      return <div className="footer_normal">
        <div className="september_div">
          <li>JIBREL PLATFORM & POCA WALLET - Q4 2017</li>
          <div className="mobile_icon_div">
            <div className="apple_icon_div"><img src={Images.apple} alt=""/></div>
            <div className="apple_icon_div"><img src={Images.android_logo} alt=""/></div>
          </div>
          <div className="button_div">
            <div className="apple_button">
              <li>CONTRIBUTE TO OUR CODE</li>
            </div>
            <div className="apple_button">
              <li>PARTICIPATE IN OUR FUNDRAISER</li>
            </div>
          </div>
        </div>
        <div className="footer_div">
          <div className="footer_view">
            <li>COMMUNITY</li>
          </div>
          <div className="footer_icon">
            <div className="footer_icon_div"><img src={Images.reddit_character} alt=""/>
              <li>REDDIT</li>
            </div>
            <div className="footer_icon_div"><img src={Images.reddit_character} alt=""/>
              <li>STEEMIT</li>
            </div>
            <div className="footer_icon_div"><img src={Images.bitcoin_logo} alt=""/>
              <li>BITCOINTALK</li>
            </div>
            <div className="footer_icon_div"><img src={Images.slack_symbol_1} alt=""/>
              <li>SLACK</li>
            </div>
            <div className="footer_icon_div"><img src={Images.twitter_logo_1} alt=""/>
              <li>TWITTER</li>
            </div>
          </div>
        </div>
      </div>
        ;
    }
  }
}

export default FooterView;
