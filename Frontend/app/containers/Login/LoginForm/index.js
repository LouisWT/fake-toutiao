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

class LoginForm extends React.PureComponent {
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

  handleOnMessageClick = (phone) => {
    if (this.timer !== undefined) return;
    // this.props.handleOnMessageClick(phone)
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
    const { captcha, captchaText, handleSubmit, handleOnCaptchaClick, handleOnMessageClick } = this.props;
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
          />
        </div>
        <div className={classnames(styles.inputField, styles.verification)}>
          <Field
            name="captcha"
            component={this.renderField}
            type="text"
            placeholder="验证码"
            autocomplete="off"
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
          />
          <span
            className={classnames(styles.codeBtn, isWaiting ? styles.active : '')}
            onClick={this.handleOnMessageClick}  
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

LoginForm = reduxForm({
  form: 'login',
  validate: (values) => {
    const errors = {}

    if (!values.get('mobile')) {
      errors.mobile = '请填写手机号码'
    } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(values.get('mobile'))) {
      errors.mobile = '请填写正确格式的手机号码'
    }
    if (!values.get('captcha')) {
      errors.captcha = '请填写图片验证码'
    } else if (md5(values.get('captcha')) !== captchaVal) {
      errors.captcha = '请填写正确的图片验证码'
    }

    if (!values.get('code')) {
      errors.code = '请填写手机验证码'
    }

    return errors
  },
})(LoginForm)

const hotComponent = hot(module)(LoginForm)

export default hotComponent