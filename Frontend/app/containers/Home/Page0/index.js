import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import page0BG from 'images/page0-bg.jpeg'
import page0BG2 from 'images/page0-bg2.png'
import logoLeft from 'images/logoleft.png'
import logoRight from 'images/logoright.png'
import page0I1 from 'images/page0-i1.png'
import page0I4 from 'images/page0-i4.png'
import signUp from 'images/signup.png'
import login from 'images/login.png'
import styles from './styles'

class Page0 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
    handleSignupCLick: PropTypes.func.isRequired,
    handleLoginClick: PropTypes.func.isRequired,
  }

  render() {
    const { disIndex, height, content } = this.props
    return (
      <div className={classnames(styles.page, styles.page0)} style={{ height }}>
        <img src={page0BG} alt='' className={styles.bg} />
        <img src={page0BG2} alt='' className={styles.bg2} />
        <img src={logoLeft} alt='' className={styles.logoleft} />
        <img src={logoRight} alt='' className={styles.logoright} />
        <div className={classnames(styles.standardContent, disIndex === 0 ? '' : styles.out)}>
          <img src={page0I1} alt='' className={styles.i1} />
          <img src={page0I4} alt='' className={styles.i4} />
          <div
            onClick={this.props.handleLoginClick}
            className={styles.i3}
            onKeyDown={() => undefined}
            role='button'
            tabIndex={0}
          >
            <img
              src={login}
              alt=''
            />
          </div>
          <div
            onClick={this.props.handleSignupCLick}
            className={styles.i2}
            onKeyDown={() => undefined}
            role='button'
            tabIndex={-1}
          >
            <img
              src={signUp}
              alt=''
            />
          </div>
          {content}
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Page0)

export default hotComponent
