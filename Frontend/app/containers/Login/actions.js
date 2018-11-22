import { createAction } from 'redux-actions'
import { getCaptcha } from './sources'

const getCaptchaAction = createAction('APP/LOGIN/GET_CAPTCHA', getCaptcha)

export default {
  getCaptchaAction,
}
