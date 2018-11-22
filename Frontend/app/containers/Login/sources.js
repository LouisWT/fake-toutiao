import http from 'utils/fetch'

async function getCaptcha() {
  try {
    const response = await http.get('v1/captcha')
    return response
  } catch (error) {
    throw error
  }
}

export {
  getCaptcha,
}
