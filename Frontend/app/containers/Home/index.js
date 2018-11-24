import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classnames from 'classnames'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import Header from './Header'
import Page0 from './Page0'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'

import styles from './styles'
import arrow from 'images/arrow.png'

class Home extends React.PureComponent {
  constructor() {
    const height = document.documentElement.clientHeight;
    super();
    this.state = {
      height,
      disIndex: 0,
      prevTime: Date.now(),
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  updateSize() {
    const height = document.documentElement.clientHeight;
    this.setState({
      height,
    })
    this.carousel.style.transition = 'transform 0.8s ease 0s';
    this.carousel.style.transform = `translateY(-${this.state.disIndex * height}px)`;
  }

  handleWheel = (e) => {
    const curTime = Date.now();
    if (curTime - this.state.prevTime <= 1500) return;
    let down = e.deltaY > 0 ? true: false;
    let curIndex = this.state.disIndex;
    let { height } = this.state;
    let disIndex;
    if (down && ++curIndex <= 5) disIndex = curIndex;
    else if (!down && --curIndex >= 0) disIndex = curIndex;
    else return;
    this.setState({
      disIndex: disIndex,
      prevTime: Date.now(),
    });
    this.carousel.style.transition = 'transform 0.8s ease 0s';
    this.carousel.style.transform = `translateY(-${disIndex * height}px)`;
  };

  handleOnWheelClick(index) {
    let curIndex = this.state.disIndex;
    if (curIndex == index) return;
    let { height } = this.state;
    this.carousel.style.transition = 'transform 0.8s ease 0s';
    this.carousel.style.transform = `translateY(-${index * height}px)`;
    this.setState({
      disIndex: index
    })
  }

  handleOnArrowClick = () => {
    let curIndex = this.state.disIndex;
    let disIndex = ++curIndex;
    if (disIndex < 0 || disIndex > 5) return;
    let { height } = this.state;
    this.carousel.style.transition = 'transform 0.8s ease 0s';
    this.carousel.style.transform = `translateY(-${disIndex * height}px)`;
    this.setState({
      disIndex: disIndex
    })
  }

  handleLoginClick = () => {
    this.props.history.push('/login')
  }

  handleSignupCLick = () => {
    this.props.history.push('/signup')
  }

  renderArrow = () => (
    <img src={arrow} alt="" className={styles.arrow} onClick={this.handleOnArrowClick}/>
  )

  render() {
    const { height, disIndex } = this.state; 
    return (
    <div className={styles.wrapper} onWheel={this.handleWheel}>
      <Header show={disIndex == 0 || disIndex == 5}></Header>
      <div className={styles.carouselBtns}>
        <ul ref={(ele) => {this.btns = ele}}>
          <li className={disIndex == 0 ?styles.active : ''} onClick={this.handleOnWheelClick.bind(this, 0)}></li>
          <li className={disIndex == 1 ?styles.active : ''} onClick={this.handleOnWheelClick.bind(this, 1)}></li>
          <li className={disIndex == 2 ?styles.active : ''} onClick={this.handleOnWheelClick.bind(this, 2)}></li>
          <li className={disIndex == 3 ?styles.active : ''} onClick={this.handleOnWheelClick.bind(this, 3)}></li>
          <li className={disIndex == 4 ?styles.active : ''} onClick={this.handleOnWheelClick.bind(this, 4)}></li>
          <li className={disIndex == 5 ?styles.active : ''} onClick={this.handleOnWheelClick.bind(this, 5)}></li>
        </ul>
      </div>
      <div className={styles.carousel} ref={(ele) => {this.carousel = ele}}>
        <Page0 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()} handleLoginClick={this.handleLoginClick} handleSignupCLick={this.handleSignupCLick}></Page0>
        <Page1 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()}></Page1>
        <Page2 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()}></Page2>
        <Page3 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()}></Page3>
        <Page4 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()}></Page4>
        <Page5 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()}></Page5>
      </div>
    </div>
    )
  }
}

const hotComponent = hot(module)(Home)

export default hotComponent