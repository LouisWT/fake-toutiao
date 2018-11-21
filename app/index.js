import React from 'react'
import ReactDOM from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import moment from 'moment'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Router from './router'
import configStore from './store'
import { immutableObjectEmpty } from './utils/constants'

// css reset
import './styles'

/* 将 moment 语言设置为中文 */
/* eslint-disable */
moment.locale('zh-cn-mine', {
  relativeTime: {
    future: '%s前',
    past: '%s后',
    s: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年'
  }
})

/* 创建 store */
const initialState = immutableObjectEmpty
const store = configStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter basename='/'>
        <Router />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
