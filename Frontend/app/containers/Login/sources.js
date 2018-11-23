import http from 'utils/fetch'

async function getCaptcha() {
  try {
    const response = await http.get('v1/captcha')
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

export {
  getCaptcha,
  postMsgReq
}
