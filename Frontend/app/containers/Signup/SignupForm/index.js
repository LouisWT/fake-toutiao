import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import md5 from 'md5';
import styles from './styles'
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form/immutable'

let captchaVal;

const mobileRequired = (value) => value ? undefined : '请输入手机号'
const mobileValid = (value) => value && /^1[3|4|5|7|8][0-9]{9}$/.test(value) ? undefined : '请输入正确格式的手机号'
const passwordRequired = (value) => value ? undefined : '请输入密码'
const passwordValid = (value) => value && /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/.test(value) ? undefined : '密码请使用字母和数字混合形式'

const verifyRequired = (value) => value ? undefined : '请再次确认密码'
const verifyValid = (value, allValues) => {
  const password = allValues.get('password');
  return value === password ? undefined : '密码与上次输入的不同'
}
const captchaRequired = (value) => value ? undefined : '请输入图片验证码'
const captchaValid = (value, allValues, { captchaText }) => value && md5(value) === captchaText ? undefined : '请输入正确图片验证码'
const msgValid = (value, allValues, props) => {
  const { captchaText, verifyCode } = props;
  const captcha = allValues.get('captcha')
  if (!captcha) return '请输入图片验证码'
  if (md5(captcha) !== captchaText) return '请先输入正确图片验证码'
  if (!value) return '请输入手机验证码'
  if (md5(value) !== verifyCode) return '请输入正确手机验证码'
  return undefined
}

class SignupForm extends React.PureComponent {
  timer = undefined

  state = {
    count: 60,
    isWaiting: false,
  }

  renderField = ({
    type,
    input,
    placeholder,
    meta: { touched, error }
  }) => (
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched &&
      (error &&
        <span className={styles.errMsg}>          <i className="fa fa-exclamation-circle" aria-hidden="true"></i>  {error}
        </span>)}
    </div>
  )

  handleMessageClick() {
    if (this.timer !== undefined) return;
    const phone = this.mobileEle.value;
    const captcha = this.captchaEle.value; 
    if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phone) || !captcha || md5(captcha) !== captchaVal) return;
    clearInterval(this.props.captchaTimer);
    this.props.handleOnMessageClick(phone)
    this.setState({
      count: 60,
      isWaiting: true,
    })
    this.timer = setInterval(() => {
      let count = this.state.count;
      if (--count == 0) {
        clearInterval(this.timer)
        this.timer = undefined
        this.setState({
          count: 60,
          isWaiting: false,
        })
      }
      this.setState({
        count: count,
      })
    }, 1000);
  }

  render() {
    const { captcha, captchaText, verifyCode, handleSubmit, handleOnCaptchaClick } = this.props;
    const { count, isWaiting } = this.state;
    captchaVal = captchaText;
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <Field
            name="mobile"
            component={this.renderField}
            type="text"
            placeholder="手机号"
            autocomplete="off"
            ref={(ele) => { this.mobileEle = ele } }
            validate={[mobileRequired, mobileValid]}
          />
        </div>
        <div className={styles.inputField}>
          <Field
            name="password"
            component={this.renderField}
            type="password"
            placeholder="密码"
            autocomplete="off"
            validate={[passwordRequired, passwordValid]}
          />
        </div>
        <div className={styles.inputField}>
          <Field
            name="verify"
            component={this.renderField}
            type="password"
            placeholder="确认密码"
            autocomplete="off"
            validate={[verifyRequired, verifyValid]}
          />
        </div>
        <div className={classnames(styles.inputField, styles.verification)}>
          <Field
            name="captcha"
            component={this.renderField}
            type="text"
            placeholder="验证码"
            autocomplete="off"
            ref={(ele) => { this.captchaEle = ele } }
            validate={[captchaRequired, captchaValid]}
          />
          <div
            className={styles.captcha} dangerouslySetInnerHTML={{__html: captcha}}
            onClick={handleOnCaptchaClick}
          >
          </div>
        </div>
        <div className={classnames(styles.inputField, styles.phoneCode)}>
          <Field
            name="code"
            component={this.renderField}
            type="text"
            placeholder="手机验证码"
            autocomplete="off"
            validate={[msgValid]}
          />
          <span
            className={classnames(styles.codeBtn, isWaiting ? styles.active : '')}
            onClick={this.handleMessageClick.bind(this)}  
          >
            {!isWaiting ? '获取验证码' : `${count}s重新获取`}
          </span>
        </div>
        <div className={styles.action}>
          <p>或使用<span>邮箱注册</span></p>
        </div>
        <input 
          type="submit"
          className={styles.actionBtn}
          value="注册"
        />
      </form>
    )
  }
}

SignupForm = reduxForm({
  form: 'login',
  // validate: (values) => {
  //   const errors = {}

  //   if (!values.get('mobile')) {
  //     errors.mobile = '请填写手机号码'
  //   } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(values.get('mobile'))) {
  //     errors.mobile = '请填写正确格式的手机号码'
  //   }
  //   if (!values.get('captcha')) {
  //     errors.captcha = '请填写图片验证码'
  //   } else if (md5(values.get('captcha')) !== captchaVal) {
  //     errors.captcha = '请填写正确的图片验证码'
  //   }
  //   if (!values.get('code')) {
  //     errors.code = '请填写手机验证码'
  //   } else if (md5(values.get('code')) !== msgVerify) {
  //     errors.code = '请填写正确手机验证码'
  //   }

  //   return errors
  // },
})(SignupForm)

const hotComponent = hot(module)(SignupForm)

export default hotComponent