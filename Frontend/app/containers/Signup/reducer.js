import _ from 'lodash'
import { fromJS } from 'immutable'
import { handleAllActions } from 'utils/utils'
import {
  defaultReducersSymbol,
  immutableObjectEmpty,
} from 'utils/constants'

const reducer = handleAllActions({
  'APP/SIGNUP/GET_CAPTCHA': {
    next(state, action) {
      const captcha = _.get(action, 'payload')
      if (captcha) {
        return state.set('captcha', fromJS(captcha))
      }
      return state
    },
    throw(state) {
      return state
    },
  },
  'APP/SIGNUP/POST_MSG_REQ': {
    next(state, action) {
      const code = _.get(action, 'payload')
      if (code) {
        return state.set('code', code)
      }
      return state
    },
    throw(state) {
      return state
    },
  },
  'APP/SIGNUP/FORM_SUBMIT': {
    next(state) {
      return state
    },
    throw(state) {
      return state
    },
  }
}, immutableObjectEmpty)

const defaultReducers = reducer(defaultReducersSymbol)

export { defaultReducers }

export default reducer
