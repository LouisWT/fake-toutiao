import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from './actions'
import selector from './selector'

import LoginForm from './LoginForm'
import styles from './styles'
import logo from 'images/logo.png'
import slogan from 'images/login-slogan.png'

class Login extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
    captchaText: PropTypes.string,
    captcha: PropTypes.string,
  }

  componentWillMount() {
    this.props.actions.getCaptchaAction();
  }

  handleOnLoginFormSubmit = (value) => {
    console.log(value);
  }

  render() {
    const { captcha } = this.props;

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
              captcha={captcha}
            ></LoginForm>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => selector

const mapDispatchToProps = (dispatch) => {
  const actionMap = {
    actions: bindActionCreators(actions, dispatch)
  }
  return actionMap
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Login)

const hotComponent = hot(module)(connectedComponent)

export default hotComponent
