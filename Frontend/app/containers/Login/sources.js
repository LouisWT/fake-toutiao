import http from 'utils/fetch'
import md5 from 'md5'

async function getCaptcha() {
  try {
    const response = await http.get('v1/authentication/captcha')
    return response
  } catch (error) {
    throw error
  }
}

async function userLogin(phone, password) {
  try {
    password = md5(md5(`toutiao_${password}`))
    const response = await http.post('v1/authentication/login', { phone, password, ua: 'pc' })
    return response
  } catch (err) {
    throw err
  }
}

export {
  getCaptcha,
  userLogin,
}
