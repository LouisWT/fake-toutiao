import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import md5 from 'md5'
import {
  Field,
  reduxForm,
} from 'redux-form/immutable'
import styles from './styles'

const mobileRequired = (value) => (value ? undefined : '请输入手机号')
const mobileValid = (value) => (value && /^1[3|4|5|7|8][0-9]{9}$/.test(value) ? undefined : '请输入正确格式的手机号')
const passwordRequired = (value) => (value ? undefined : '请输入密码')
const captchaRequired = (value) => (value ? undefined : '请输入图片验证码')
const captchaValid = (value, allValues, { captchaText }) => (value && md5(value) === captchaText ? undefined : '请输入正确图片验证码')

class LoginForm extends React.PureComponent {
  static propTypes = {
    captcha: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    handleOnCaptchaClick: PropTypes.func.isRequired
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
        <span className={styles.errMsg}>     <i className='fa fa-exclamation-circle' aria-hidden='true' />
          {error}
        </span>)}
    </div>
  )

  render() {
    const { captcha, handleSubmit, handleOnCaptchaClick } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <Field
            name='mobile'
            component={this.renderField}
            type='text'
            placeholder='手机号'
            autocomplete='off'
            validate={[mobileRequired, mobileValid]}
          />
        </div>
        <div className={styles.inputField}>
          <Field
            name='password'
            component={this.renderField}
            type='password'
            placeholder='密码'
            autocomplete='off'
            validate={[passwordRequired]}
          />
        </div>
        <div className={classnames(styles.inputField, styles.verification)}>
          <Field
            name='captcha'
            component={this.renderField}
            type='text'
            placeholder='验证码'
            autocomplete='off'
            ref={(ele) => { this.captchaEle = ele }}
            validate={[captchaRequired, captchaValid]}
          />
          <div
            className={styles.captcha}
            dangerouslySetInnerHTML={{ __html: captcha }}
            onClick={handleOnCaptchaClick}
            onKeyDown={() => undefined}
            role='button'
            tabIndex={0}
          />
        </div>
        <input
          type='submit'
          className={styles.actionBtn}
          value='登录'
        />
      </form>
    )
  }
}

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)

const hotComponent = hot(module)(LoginReduxForm)

export default hotComponent
