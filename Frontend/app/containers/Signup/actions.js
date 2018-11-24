import { createAction } from 'redux-actions'
import { getCaptcha, postMsgReq, userSignUp } from './sources'

const getCaptchaAction = createAction('APP/SIGNUP/GET_CAPTCHA', getCaptcha)
const postMsgReqAction = createAction('APP/SIGNUP/POST_MSG_REQ', postMsgReq)
const userSignupAction = createAction('APP/SIGNUP/FORM_SUBMIT', userSignUp)

export default {
  getCaptchaAction,
  postMsgReqAction,
  userSignupAction,
}
