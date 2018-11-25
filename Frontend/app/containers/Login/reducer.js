import PubSub from 'pubsub-js'
import _ from 'lodash'
import { fromJS } from 'immutable'
import { handleAllActions } from 'utils/utils'
import {
  defaultReducersSymbol,
  immutableObjectEmpty,
} from 'utils/constants'

const reducer = handleAllActions({
  'APP/LOGIN/GET_CAPTCHA': {
    next(state, action) {
      const captcha = _.get(action, 'payload')
      if (captcha) {
        return state.set('captcha', fromJS(captcha));
      } else {
        return state
      }
    },
    throw(state) {
      return state
    },
  },
  'APP/LOGIN/FORM_SUBMIT': {
    next(state, action) {
      return state
    },
    throw(state) {
      return state
    },
  }
}, immutableObjectEmpty)

const defaultReducers = reducer(defaultReducersSymbol)

export {
  defaultReducers,
}

export default reducer