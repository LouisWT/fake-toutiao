import { createAction } from 'redux-actions'
import { getCaptcha, postMsgReq } from './sources'

const getCaptchaAction = createAction('APP/LOGIN/GET_CAPTCHA', getCaptcha)

const postMsgReqAction = createAction('APP/LOGIN/POST_MSG_REQ', postMsgReq)

export default {
  getCaptchaAction,
  postMsgReqAction,
}
