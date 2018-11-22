import axios from 'axios'
import PubSub from 'pubsub-js'

const http = axios.create({
  baseURL: '/api/',
  timeout: 10000,
})

/* 从 cookie 中获取 token */
const result = document.cookie.match(/qingtoken=(QJWT [\w\.\-]+)/) // eslint-disable-line

/* 销毁 cookie 中的 token */
document.cookie = `qingtoken=none; expires=${new Date(0)};`

/* 如果当前 cookie 中存在 token 值，说明用户是通过扫描二维码进入的，此时 cookie 中的 */
/* token 值是最新的，则将 token 值保存到 localStorage 中；如果 cookie 中没有 */
/* token，则表示用户不是通过扫描二维码进入的，此时从 localStorage 中取出之前的 token */
if (result) {
  window.localStorage.setItem('token', result[1])
}

/* 该事件只会在不同页面上改变 storage 时被触发 */
window.addEventListener('storage', (event) => {
  if (event.key === 'token') {
    /* 发布用户 token 发生变化事件 */
    PubSub.publish('FETCH/LOCAL_STORAGE_TOKEN_CHANGE')
  }
})

/* 订阅成功退出应用事件，清空 localStorage 中保存的 token */
PubSub.subscribe('CONTAINERS/HEADER/LOGOUT_SUCCEED', () => {
  window.localStorage.removeItem('token')
})

const getDynamicConfig = function () {
  /* 在之后的请求中，token 全部是从 localStorage 中取得 */
  const token = window.localStorage.getItem('token')

  return {
    headers: {
      authorization: token,
    },
  }
}

function axiosGet(path, config) {
  return http
    .get(path, { ...getDynamicConfig(), ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

function axiosPost(path, params, config) {
  return http
    .post(path, params, { ...getDynamicConfig(), ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

function axiosPut(path, params, config) {
  return http
    .put(path, params, { ...getDynamicConfig(), ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

function axiosDelete(path, config) {
  return http
    .delete(path, { ...getDynamicConfig(), ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

/* 导出动态获取请求配置函数 */
/* eslint-disable */
export {
  getDynamicConfig,
}
/* eslint-disable */

/* 导出常用的四种 http 请求 */
export default {
  instance: http,
  get: axiosGet,
  post: axiosPost,
  put: axiosPut,
  delete: axiosDelete,
}
