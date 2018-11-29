import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import logo from 'images/logo.png'
import slogan from 'images/login-slogan.png'
import http from 'utils/fetch'
import md5 from 'md5'
import SignupForm from './SignupForm'
import actions from './actions'
import selector from './selector'
import styles from './styles'

class Signup extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    captcha: PropTypes.string,
    captchaText: PropTypes.string,
    verifyCode: PropTypes.string,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)
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

  handleOnCaptchaClick = () => {
    const curTime = Date.now()
    if (curTime - this.prevRefCapTim < 3000) return
    this.props.actions.getCaptchaAction()
    this.prevRefCapTim = curTime
  }

  handleOnMessageClick = (phoneNumber) => {
    this.props.actions.postMsgReqAction(phoneNumber)
  }

  handleOnLoginFormSubmit = async (value) => {
    const phone = value.get('mobile')
    const code = value.get('code')
    const password = value.get('password')
    // this.props.actions.userSignupAction(phone, code, password)
    const encodePassword = md5(md5(`toutiao_${password}`))
    const {
      type, url, token, user
    } = await http.post('v1/authentication/phone', {
      phone, code, ua: 'pc', password: encodePassword
    })
    if (type === 'redirect') {
      window.localStorage.setItem('token', token)
      const origin = window.location.origin
      window.location.replace(`${origin}/${url}?username=${user}`)
    }
  }

  render() {
    const { captcha, captchaText, verifyCode } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <a href='#' target='__blank' className={styles.logoWrap}>
            <img src={logo} alt='' />
          </a>
          <div className={styles.sloganWrap}>
            <img src={slogan} alt='' />
          </div>
          <div className={styles.signBox}>
            <SignupForm
              captcha={captcha}
              captchaText={captchaText}
              captchaTimer={this.captchaTimer}
              verifyCode={verifyCode}
              onSubmit={this.handleOnLoginFormSubmit}
              handleOnCaptchaClick={this.handleOnCaptchaClick}
              handleOnMessageClick={this.handleOnMessageClick}
            />
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
