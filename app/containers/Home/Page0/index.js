import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import styles from './styles'
import page0BG from 'images/page0-bg.jpeg'
import page0BG2 from 'images/page0-bg2.png'
import logoLeft from 'images/logoleft.png'
import logoRight from 'images/logoright.png'
import page0I1 from 'images/page0-i1.png'
import page0I4 from 'images/page0-i4.png'
import signUp from 'images/signup.png'
import login from 'images/login.png'

class Page0 extends React.PureComponent {
  static propTypes = {
    disIndex: PropTypes.number.isRequired,
    content: PropTypes.element.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { disIndex, content, height } = this.props;
    return (
      <div className={classnames(styles.page, styles.page0)} style={{ height: height }}>
        <img src={page0BG} alt="" className={styles.bg} />
        <img src={page0BG2} alt="" className={styles.bg2} />
        <img src={logoLeft} alt="" className={styles.logoleft} />
        <img src={logoRight} alt="" className={styles.logoright} />
        <div className={classnames(styles.standardContent, disIndex == 0 ? '' : styles.out)}>
          <img src={page0I1} alt="" className={styles.i1} />
          <img src={page0I4} alt="" className={styles.i4} />
          <img src={login} alt="" className={styles.i3} />
          <img src={signUp} alt="" className={styles.i2} />
          {/* <img src={arrow} alt="" className={styles.arrow} onClick={this.handleOnArrowClick} /> */}
          {content}
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Page0)

export default hotComponent