import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
import Route from 'react-router-dom/Route'
import axios from 'axios'
import importedComponent from 'react-imported-component'
import http, { getDynamicConfig } from 'utils/fetch'

const Home = importedComponent(() => (
  import(/* webpackChunkName: "Home" */ 'containers/Home')))

const Signup = importedComponent(() => (
  import(/* webpackChunkName: "Signup" */ 'containers/Signup')))

const SignupProfile = importedComponent(() => (
  import(/* webpackChunkName: "SignupProfile" */ 'containers/SignupProfile')))

const Login = importedComponent(() => (
  import(/* webpackChunkName: "Login" */ 'containers/Login')))

class Routes extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  componentWillMount() {
    http.instance.interceptors.response.use((response) => (response),
    (error) => {
      const {
        code,
        config: {
          method,
          url,
        },
        response: {
          status: statusCode,
        } = {},
        message,
      } = error
      console.log(error)
      if (statusCode === 401) {
        if (location.pathname !== '/login') {
          /* 当用户不在登录页面时，不再显示错误信息，直接跳转到登录页面 */
          history.replace('/login')
        }
        return Promise.reject(error)
      }

    })
  }

  render() {
    return (
      <Fragment>
        <Route path='/' component={Home} exact strict />
        <Route path='/signup_profile' component={SignupProfile} exact strict />
        <Route path='/signup' component={Signup} exact strict />
        <Route path='/login' component={Login} exact strict />
      </Fragment>
    )
  }
}

export default Routes
