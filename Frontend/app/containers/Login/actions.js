import { createAction } from 'redux-actions'
import { getCaptcha, userLogin } from './sources'

const getCaptchaAction = createAction('APP/LOGIN/GET_CAPTCHA', getCaptcha)
const userLoginAction = createAction('APP/LOGIN/FORM_SUBMIT', userLogin)

export default {
  getCaptchaAction,
  userLoginAction,
}
