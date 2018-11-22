import PubSub from 'pubsub-js'
import lodash from 'lodash'
import { fromJS } from 'immutable'
import { handleAllActions } from 'utils/utils'
import {
  defaultReducersSymbol,
  immutableObjectEmpty,
} from 'utils/constants'

const reducer = handleAllActions({
  'APP/LOGIN/GET_CAPTCHA': {
    next(state, action) {
      const captcha = lodash.get(action, 'payload')
      if (captcha) {
        return captcha
      } else {
        return state
      }
    },
    throw(state) {
      return state
    },
  },
}, immutableObjectEmpty)

const defaultReducers = reducer(defaultReducersSymbol)

export {
  defaultReducers,
}

export default reducer