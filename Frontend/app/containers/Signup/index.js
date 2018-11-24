import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from './actions'
import selector from './selector'

import SignupForm from './SignupForm'
import styles from './styles'
import logo from 'images/logo.png'
import slogan from 'images/login-slogan.png'

class Signup extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
  }

  captchaTimer = undefined;

  constructor(props) {
    super(props);
    this.prevRefCapTim = Date.now()
  }

  componentWillMount() {
    this.props.actions.getCaptchaAction()
    this.captchaTimer = setInterval(() => {
      this.prevRefCapTim = Date.now()
      this.props.actions.getCaptchaAction()
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.captchaTimer)
  }

  handleOnCaptchaClick() {
    const curTime = Date.now()
    if (curTime - this.prevRefCapTim < 3000) return
    this.props.actions.getCaptchaAction()
    this.prevRefCapTim = curTime
  }

  handleOnMessageClick(phoneNumber) {
    this.props.actions.postMsgReqAction(phoneNumber)
  }

  handleOnLoginFormSubmit = (value) => {
    const phone = value.get('mobile');
    const code = value.get('code');
    this.props.actions.userSignupAction(phone, code);
  }

  render() {
    const { captcha, captchaText, verifyCode } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <a href="#" target="__blank" className={styles.logoWrap}>
            <img src={logo}/>
          </a>
          <div className={styles.sloganWrap}>
            <img src={slogan}/>
          </div>
          <div className={styles.signBox}>
            <SignupForm
              captcha={captcha}
              captchaText={captchaText}
              captchaTimer={this.captchaTimer}
              verifyCode={verifyCode}
              onSubmit={this.handleOnLoginFormSubmit}
              handleOnCaptchaClick={this.handleOnCaptchaClick.bind(this)}
              handleOnMessageClick={this.handleOnMessageClick.bind(this)}
            ></SignupForm>
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

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Signup)

const hotComponent = hot(module)(connectedComponent)

export default hotComponent
