import md5 from 'md5'
import http from 'utils/fetch'

async function getCaptcha() {
  try {
    const response = await http.get('v1/authentication/captcha')
    return response
  } catch (error) {
    throw error
  }
}

async function postMsgReq(phone) {
  try {
    const response = await http.post('v1/authentication/message', { phone })
    return response
  } catch (err) {
    throw err
  }
}

async function userSignUp(phone, code, password) {
  try {
    const encodePassword = md5(md5(`toutiao_${password}`))
    const response = await http.post('v1/authentication/phone', {
      phone, code, ua: 'pc', password: encodePassword
    })
    return response
  } catch (err) {
    throw err
  }
}

export {
  getCaptcha,
  postMsgReq,
  userSignUp,
}
