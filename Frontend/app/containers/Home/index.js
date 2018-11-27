import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import arrow from 'images/arrow.png'
import Header from './Header'
import Page0 from './Page0'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import styles from './styles'

class Home extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor() {
    const height = document.documentElement.clientHeight
    super()
    this.state = {
      height,
      disIndex: 0,
      prevTime: Date.now(),
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize.bind(this))
  }

  updateSize() {
    const height = document.documentElement.clientHeight
    this.setState({
      height,
    })
    this.carousel.style.transition = 'transform 0.8s ease 0s'
    this.carousel.style.transform = `translateY(-${this.state.disIndex * height}px)`
  }

  handleWheel = (e) => {
    const curTime = Date.now()
    if (curTime - this.state.prevTime <= 1500) return
    const down = e.deltaY > 0
    let curIndex = this.state.disIndex
    const { height } = this.state
    let disIndex
    if (down && ++curIndex <= 5) disIndex = curIndex
    else if (!down && --curIndex >= 0) disIndex = curIndex
    else return
    this.setState({
      disIndex,
      prevTime: Date.now(),
    })
    this.carousel.style.transition = 'transform 0.8s ease 0s'
    this.carousel.style.transform = `translateY(-${disIndex * height}px)`
  }

  handleOnWheelClick = (event) => {
    if (event.target.nodeName !== 'LI') return
    const index = Number(event.target.dataset.index)
    const curIndex = this.state.disIndex
    if (curIndex === index) return
    const { height } = this.state
    this.carousel.style.transition = 'transform 0.8s ease 0s'
    this.carousel.style.transform = `translateY(-${index * height}px)`
    this.setState({
      disIndex: index,
    })
  }

  handleOnArrowClick = () => {
    let curIndex = this.state.disIndex
    const disIndex = ++curIndex
    if (disIndex < 0 || disIndex > 5) return
    const { height } = this.state
    this.carousel.style.transition = 'transform 0.8s ease 0s'
    this.carousel.style.transform = `translateY(-${disIndex * height}px)`
    this.setState({
      disIndex,
    })
  }

  handleLoginClick = () => {
    this.props.history.push('/login')
  }

  handleSignupCLick = () => {
    this.props.history.push('/signup')
  }

  renderArrow = () => (
    <div
      onClick={this.handleOnArrowClick}
      className={styles.arrow}
      onKeyDown={() => undefined}
      role='button'
      tabIndex={0}
    >
      <img
        src={arrow}
        alt=''
      />
    </div>
  )

  render() {
    const { disIndex } = this.state

    return (
      <div className={styles.wrapper} onWheel={this.handleWheel}>
        <Header show={disIndex === 0 || disIndex === 5} />
        <div
          className={styles.carouselBtns}
          onClick={this.handleOnWheelClick}
          onKeyDown={() => undefined}
          role='button'
          tabIndex={0}
        >
          <ul>
            <li className={disIndex === 0 ? styles.active : ''} data-index={0} />
            <li className={disIndex === 1 ? styles.active : ''} data-index={1} />
            <li className={disIndex === 2 ? styles.active : ''} data-index={2} />
            <li className={disIndex === 3 ? styles.active : ''} data-index={3} />
            <li className={disIndex === 4 ? styles.active : ''} data-index={4} />
            <li className={disIndex === 5 ? styles.active : ''} data-index={5} />
          </ul>
        </div>
        <div className={styles.carousel} ref={(ele) => { this.carousel = ele }}>
          <Page0 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()} handleLoginClick={this.handleLoginClick} handleSignupCLick={this.handleSignupCLick} />
          <Page1 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()} />
          <Page2 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()} />
          <Page3 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()} />
          <Page4 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()} />
          <Page5 disIndex={this.state.disIndex} height={this.state.height} content={this.renderArrow()} />
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Home)

export default hotComponent
