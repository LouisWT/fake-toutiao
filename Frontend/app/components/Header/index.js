import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import styles from './styles'

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  downTimer = undefined

  state = {
    downSelect: false,
    onTab: false,
  }

  handleDownEnter = () => {
    this.setState({
      downSelect: true
    })
  }

  handleDownLeave = () => {
    if (this.downTimer) return;
    this.downTimer = window.setTimeout(() => {
      this.setState({
        downSelect: false
      })
      clearTimeout(this.downTimer);
      this.downTimer = undefined;
    }, 600)
  }

  handleEnterTab = () => {
    clearTimeout(this.downTimer);
    this.downTimer = undefined;
  }

  handleLeaveTab = () => {
    this.setState({
      downSelect: false
    })
  }

  render() {
    const { downSelect } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.logo}></div>
          <div className={styles.right}>
            <div className={styles.user}>
              <div className={styles.information}>
                <img src={this.props.avatarUrl} className={styles.avatar}/>
                <span className={styles.userName}>{this.props.username}</span>
                <i className="fa fa-caret-down" aria-hidden="true" onMouseEnter={this.handleDownEnter} onMouseLeave={this.handleDownLeave}></i>
              </div>
              <div className={classnames(styles.dashboard, downSelect ? styles.showDash : '')} onMouseEnter={this.handleEnterTab} onMouseLeave={this.handleLeaveTab}>
                <ul>
                  <li className="author"><i className="fa fa-cog" aria-hidden="true"></i>账号设置</li>
                  <li className="author"><i className="fa fa-shield" aria-hidden="true"></i>账号权限</li>
                  <li className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>退出登录</li>
                </ul>
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

const hotComponent = hot(module)(Header)

export default hotComponent