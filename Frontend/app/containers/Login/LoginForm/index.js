import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { hot } from 'react-hot-loader'
import styles from './styles'
import {
  Field,
  reduxForm,
  getFormValues,
} from 'redux-form/immutable'

class LoginForm extends React.PureComponent {
  render() {
    const { handleSubmit, captcha } = this.props;
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <Field
            name="mobile"
            component="input"
            type="text"
            placeholder="手机号"
          />
        </div>
        <div className={classnames(styles.inputField, styles.verification)}>
          <Field
            name="captcha"
            component="input"
            type="text"
            placeholder="验证码"
          />
          <div className={styles.captcha} dangerouslySetInnerHTML={{__html: captcha}}>
          </div>
        </div>
        <div className={classnames(styles.inputField, styles.phoneCode)}>
          <Field
            name="code"
            component="input"
            type="text"
            placeholder="手机验证码"
          />
          <span className={styles.codeBtn}>
            获取验证码
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
      errors.mobile = '请填写手机号手机号码'
    } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(values.get('mobile'))) {
      errors.mobile = '请填写正确格式的手机号码'
    }

    if (!values.get('captcha')) {
      errors.captcha = '请填写图片验证码'
    }

    if (!values.get('code')) {
      errors.captcha = '请填写手机验证码'
    }

    return errors
  },
})(LoginForm)

const hotComponent = hot(module)(LoginForm)

export default hotComponent