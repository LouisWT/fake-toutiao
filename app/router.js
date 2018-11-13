import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
import Route from 'react-router-dom/Route'
import axios from 'axios'
import importedComponent from 'react-imported-component'
import ErrorTips from 'components/ErrorTips'
import Loading from 'components/Loading'
import http, { getDynamicConfig } from 'utils/fetch'

const LoadComponent = (loader) => (
  importedComponent(loader, {
    LoadingComponent: Loading,
  })
)

const User = LoadComponent(() => (
  import(/* webpackChunkName: "User" */ 'containers/User')))

class Routes extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.subscribeTokens = []
  }

  state = {
    error: null,
  }

  componentWillMount() {
    const {
      router: {
        history,
      },
      store: {
        dispatch,
      },
    } = this.context

    /* 针对所有通过自定义 http 请求器发出的请求产生的错误做一个拦截，在页面上弹出错误信息提示 */
    http.instance.interceptors.response.use((response) => response, (error) => {
      const { router: { route: { location } } } = this.context

      const { code, config: { method, url }, response: { status: statusCode } = {}, message } = error

      const errorTextNode = [
        <div key='url'>{`请求地址: ${window.location.protocol}//${window.location.host}${url}`}</div>,
        <div key='method'>{`请求方法: ${method.toUpperCase()}`}</div>,
      ]

      /* 用户尚未登录的错误场景 */
      if (statusCode === 401) {
        if (location.pathname !== '/login') {
          /* 当用户不在登录页面时，不再显示错误信息，直接跳转到登录页面 */
          history.replace('/login')
        }

        /* 派发一个用户尚未登录的 action，修改 store 中的用户个人信息为未登录状态 */
        dispatch({
          type: 'APP/MINE/GET_USER_INFORMATION',
          payload: null,
        })
        return Promise.reject(error)
      }

      /* 出现异常请求的错误场景 */
      if (code && code.toUpperCase() === 'ECONNABORTED') {
        /* 请求超时 */
        errorTextNode.push(<div key='reason'>错误原因: 请求超时，您当前的网络环境不太好，请稍后重试</div>)
      } else if (statusCode === 401) {
        errorTextNode.push(<div key='statusCode'>错误代码: 401</div>)
        errorTextNode.push(<div key='reason'>错误原因: 您当前处于未登录状态，请通过手机微信扫描二维码登录</div>)
      } else if (statusCode === 500) {
        errorTextNode.push(<div key='statusCode'>错误代码: 500</div>)
        errorTextNode.push(<div key='reason'>错误原因: 服务器出现了错误，请稍后重试</div>)
      } else if (statusCode === 502) {
        errorTextNode.push(<div key='statusCode'>错误代码: 502</div>)
        errorTextNode.push(<div key='reason'>错误原因: 服务器暂时不能响应您的请求，请稍后重试</div>)
      } else {
        errorTextNode.push(<div key='reason'>{`错误原因: ${message}`}</div>)
      }

      this.setState({ error: errorTextNode })

      return Promise.reject(error)
    })
  }

  componentWillUnmount() {
  }

  render() {
    const {
      error,
    } = this.state

    return (
      <Fragment>
        <Route path='/user' component={User} exact strict />
        <ErrorTips error={error} />
      </Fragment>
    )
  }
}

export default Routes
