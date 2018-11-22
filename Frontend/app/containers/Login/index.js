import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import LoginForm from './LoginForm'
import styles from './styles'
import logo from 'images/logo.png'
import slogan from 'images/login-slogan.png'

class Login extends React.PureComponent {

  handleOnLoginFormSubmit = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <a href="http://www.toutiao.com" target="__blank" className={styles.logoWrap}>
            <img src={logo}/>
          </a>
          <div className={styles.sloganWrap}>
            <img src={slogan}/>
          </div>
          <div className={styles.signBox}>
            <LoginForm
              onSubmit={this.handleOnLoginFormSubmit}
            ></LoginForm>
          </div>
        </div>
      </div>
    )
  }
}

const hotComponent = hot(module)(Login)

export default hotComponent
