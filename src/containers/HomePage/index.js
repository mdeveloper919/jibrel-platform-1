import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';

import BasePage from '../../components/BasePage';
import Pagination from '../../components/Pagination';

import './style.css';
import Images from './images';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:      window.innerWidth,
      mobileNavVisible: false,
      index:            0,
      index1:           0
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

  handleChangeIndex = (index) => {
    this.setState({
                    index,
                  });
  };

  handleChangeIndex1 = (index1) => {
    this.setState({
                    index1,
                  });
  };

  slide1() {
    return (
      <div className="slide1_div">
        <div className="inner_view"
             style={{width: this.state.windowWidth <= 1000 ? window.innerWidth * 8 / 10 : window.innerWidth * 7 / 10}}>
          <div className="title_div" style={{fontSize: this.state.windowWidth <= 1000 ? 34 : 42}}>
            the <span style={{display: 'inline-block', color: '#ffffff', fontWeight: 300}}>poca</span> wallet
            <div className="title_div" style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 20, marginTop: 30}}>
              send and receive money anywhere... for <span style={{fontStyle: "italic"}}>free...</span>
              <div
                className="icon_view"
                style={{width: this.state.windowWidth <= 500 ? window.innerWidth * 8 / 10 : 400}}>
                <div className="img_view"><img src={Images.exchange4} alt=""/></div>
                <div style={{fontSize: this.state.windowWidth <= 1000 ? 18 : 20}}>
                  Multi-currency support
                  <div style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 18}}>
                    poca intends to be available in over 48 countries on launch
                  </div>
                </div>
              </div>
              <div
                className="icon_view"
                style={{width: this.state.windowWidth <= 500 ? window.innerWidth * 8 / 10 : 400, marginTop: 30}}>
                <div className="img_view"><img src={Images.bill} alt=""/></div>
                <div style={{fontSize: this.state.windowWidth <= 1000 ? 18 : 20}}>
                  Send, receive, save, spend
                  <div style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 18}}>
                    Your money is your money, anytime or anywhere, in any currency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  slide2() {
    return (
      <div className="slide2_div">
        <div className="center_inner"
             style={{width: this.state.windowWidth <= 1000 ? window.innerWidth * 8 / 10 : window.innerWidth * 7 / 10}}>
          <div className="center_div">
            <div className="title_div" style={{fontSize: this.state.windowWidth <= 1000 ? 34 : 42}}>
              meet <span style={{display: 'inline-block', color: '#ffffff', fontWeight: 300}}>poca...</span>
              <div className="title_div" style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 20, marginTop: 30}}>
                Your gateway to <span style={{fontStyle: "italic"}}>free</span> global e-commerce
                <div className="icon_view"
                     style={{width: this.state.windowWidth <= 500 ? window.innerWidth * 8 / 10 : 400}}>
                  <div className="img_view"><img src={Images.internet} alt=""/></div>
                  <div style={{fontSize: this.state.windowWidth <= 1000 ? 18 : 20}}>
                    Become a global shopper
                    <div style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 18}}>
                      Save money on fees, spend extra on shipping - buy anything, anywhere
                    </div>
                  </div>
                </div>
                <div className="icon_view"
                     style={{width: this.state.windowWidth <= 500 ? window.innerWidth * 8 / 10 : 400, marginTop: 30}}>
                  <div className="img_view"><img src={Images.paperPlane} alt=""/></div>
                  <div style={{fontSize: this.state.windowWidth <= 1000 ? 18 : 20}}>
                    Your money roams with you...
                    <div style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 18}}>
                      No need to convert money, poca is a local... your money in any currency
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  slide3() {
    return (
      <div className="slide3_div">
        <div className="inner_view"
             style={{width: this.state.windowWidth <= 1000 ? window.innerWidth * 8 / 10 : window.innerWidth * 7 / 10}}>
          <div className="title_div" style={{fontSize: this.state.windowWidth <= 1000 ? 34 : 42}}>
            livin' la vida <span style={{display: 'inline-block', color: '#ffffff', fontWeight: 300}}>poca...</span>
            <div className="title_div" style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 20, marginTop: 30}}>
              setup and manage recurring payments / receivables
              <div className="icon_view"
                   style={{width: this.state.windowWidth <= 500 ? window.innerWidth * 8 / 10 : 400}}>
                <div className="img_view"><img src={Images.calendar} alt=""/></div>
                <div style={{fontSize: this.state.windowWidth <= 1000 ? 18 : 20}}>
                  Scheduled Transfers
                  <div style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 18}}>
                    Set up recurring transfers and payments, get notified when the money arrives
                  </div>
                </div>
              </div>
              <div className="icon_view"
                   style={{width: this.state.windowWidth <= 500 ? window.innerWidth * 8 / 10 : 400, marginTop: 30}}>
                <div className="img_view"><img src={Images.accounting} alt=""/></div>
                <div style={{fontSize: this.state.windowWidth <= 1000 ? 18 : 20}}>
                  Business Payables & Receivables
                  <div style={{fontSize: this.state.windowWidth <= 1000 ? 16 : 18}}>
                    Pay international suppliers without the ridiculous fees, manage receivables easily
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  slide11() {
    if (this.state.windowWidth <= 1000) {
      return (
        <div className="mobile_slide_div">
          <li className="title_li" style={{fontSize: 20}}>Send and receive money anywhere... in any currency</li>
          <li className="subtitle_li" style={{fontSize: 18}}>Peer-to-peer, business-to-business, consumer-to-merchant
          </li>
          <li className="desciption_li" style={{fontSize: 14}}>
            whether you're sending money home, paying an international
            supplier or even doing some online shopping, the jibrel network will allow you to send or pay in any
            currency
            to any account, without the high exchange rates and transmission fees - we cut out the middleman
          </li>
          <div className="slide_img"><img src={Images.exchange3} alt=""/></div>
          <div className="mobile_slide_button">
            <li>SIGN UP</li>
          </div>
        </div>
      );
    } else {
      return (
        <div className="slide_div">
          <div className="left_div">
            <div className="icon_left_div">
              <li className="title_li">Send and receive money anywhere... in any currency</li>
              <li className="subtitle_li">Peer-to-peer, business-to-business, consumer-to-merchant</li>
              <li className="desciption_li">
                whether you're sending money home, paying an international supplier or even
                doing some online shopping, the jibrel network will allow you to send or pay in any currency to any
                account, without the high exchange rates and transmission fees - we cut out the middleman
              </li>
            </div>
          </div>
          <div className="right_div">
            <div className="icon_right_div">
              <img src={Images.exchange3} alt=""/>
              <div className="slide_button">
                <li>SIGN UP</li>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  slide12() {
    if (this.state.windowWidth <= 1000) {
      return (
        <div className="mobile_slide_div">
          <li className="title_li" style={{fontSize: 20}}>Store money safely and securely using the jibrel network</li>
          <li className="subtitle_li" style={{fontSize: 18}}>
            All integrated exchanges are fully compliant with financial regulation
          </li>
          <li className="desciption_li" style={{fontSize: 14}}>
            We're helping everyone leverage the power of digital
            currencies without the associated risks - use KYC/AML compliant exchanges to store your fiat currency, keep
            track of it securely and immutably using the power of the blockchain and the jibrel network
          </li>
          <div className="slide_img"><img src={Images.presentation} alt=""/></div>
          <div className="mobile_slide_button">
            <li>SIGN UP</li>
          </div>
        </div>
      );
    } else {
      return (
        <div className="slide_div">
          <div className="left_div">
            <div className="icon_left_div">
              <li className="title_li">Store money safely and securely using the jibrel network</li>
              <li className="subtitle_li">All integrated exchanges are fully compliant with financial regulation</li>
              <li className="desciption_li">
                We're helping everyone leverage the power of digital currencies without the
                associated risks - use KYC/AML compliant exchanges to store your fiat currency, keep track of it
                securely
                and immutably using the power of the blockchain and the jibrel network
              </li>
            </div>
          </div>
          <div className="right_div">
            <div className="icon_right_div">
              <img src={Images.presentation} alt=""/>
              <div className="slide_button">
                <li>SIGN UP</li>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  slide13() {
    if (this.state.windowWidth <= 1000) {
      return (
        <div className="mobile_slide_div">
          <li className="title_li" style={{fontSize: 20}}>
            Hedge against digital asset volatility without going off-chain
          </li>
          <li className="subtitle_li" style={{fontSize: 18}}>Open a money market account to invest in safer assets</li>
          <li className="desciption_li" style={{fontSize: 14}}>
            We're providing an ecosystem for developers and users to
            build their own tools and products that leverages the jibrel central bank's capabilities - users can create
            their own fiat to digital asset smart contracts that utilize the capabilities unlocked by storing fiat
            on-chain
          </li>
          <div className="slide_img"><img src={Images.safeBox} alt=""/></div>
          <div className="mobile_slide_button">
            <li>SIGN UP</li>
          </div>
        </div>
      );
    } else {
      return (
        <div className="slide_div">
          <div className="left_div">
            <div className="icon_left_div">
              <li className="title_li">Hedge against digital asset volatility without going off-chain</li>
              <li className="subtitle_li">Open a money market account to invest in safer assets</li>
              <li className="desciption_li">
                We're providing an ecosystem for developers and users to build their own tools
                and products that leverages the jibrel central bank's capabilities - users can create their own fiat to
                digital asset smart contracts that utilize the capabilities unlocked by storing fiat on-chain
              </li>
            </div>
          </div>
          <div className="right_div">
            <div className="icon_right_div">
              <img src={Images.safeBox} alt=""/>
              <div className="slide_button">
                <li>SIGN UP</li>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <BasePage>
        <AutoPlaySwipeableViews
          enableMouseEvents
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
          interval={6000}
        >
          {this.slide1()}
          {this.slide2()}
          {this.slide3()}
        </AutoPlaySwipeableViews>
        <Pagination
          dots={3}
          index={this.state.index}
          onChangeIndex={this.handleChangeIndex}
          slide_idx={1}
        />

        <div className="swipe_view" style={{marginTop: 60, width: this.state.windowWidth >= 1200 ? 1100 : '90%'}}>
          <AutoPlaySwipeableViews
            enableMouseEvents
            index={this.state.index1}
            onChangeIndex={this.handleChangeIndex1}
            interval={6000}
          >
            <div>{this.slide11()}</div>
            <div>{this.slide12()}</div>
            <div>{this.slide13()}</div>
          </AutoPlaySwipeableViews>
          <Pagination
            dots={3}
            index={this.state.index1}
            onChangeIndex={this.handleChangeIndex1}
            slide_idx={0}
          />
        </div>
      </BasePage>
    );
  }
}

export default HomePage;
