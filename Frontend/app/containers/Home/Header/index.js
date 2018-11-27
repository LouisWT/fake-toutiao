import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import logoLeft from 'images/logoleft.png'
import logoRightS from 'images/logoright-orange.png'
import styles from './styles'

class Header extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className={classnames(styles.header, this.props.show ? '' : styles.showHeader)}>
        <img src={logoLeft} alt='' className={styles.logoLeft} />
        <img src={logoRightS} alt='' className={styles.logoRight} />
        <div className={styles.btnWrapper}>
          <div className={classnames(styles.btn, styles.register)}>
            <a href='/signup'>注册</a>
          </div>
          <div className={classnames(styles.btn, styles.login)}>
            <a href='/login'>登录</a>
          </div>
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Header)

export default hotComponent
