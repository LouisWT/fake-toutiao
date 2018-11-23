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
        return fromJS({ captcha: captcha })
      } else {
        return state
      }
    },
    throw(state) {
      return state
    },
  },
  'APP/LOGIN/POST_MSG_REQ': {
    next(state, action) {
      const code = _.get(action, 'payload')
      if (code) {
        return fromJS({ verifyCode: code })
      } else {
        return state
      }
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