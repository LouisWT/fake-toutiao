import PubSub from 'pubsub-js'
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import { createLogger } from 'redux-logger'
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist-immutable'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'

const _create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore
const create = process.env.NODE_ENV === 'production' ? createStore : _create

const logger = createLogger({
  collapsed: true
})

function configStore(initialState) {
  let store = null

  if (process.env.NODE_ENV === 'production') {
    const createStoreWithMiddleware = compose(
      applyMiddleware(
        promiseMiddleware,
      ),
      autoRehydrate(),
    )(create)
    store = createStoreWithMiddleware(rootReducer, initialState)
  } else {
    const createStoreWithMiddleware = compose(
      applyMiddleware(
        promiseMiddleware,
        logger,
      ),
      autoRehydrate(),
    )(create)
    store = createStoreWithMiddleware(rootReducer, initialState)
    if (module.hot) {
      /* 当 webpack 开启热更新功能时，如果 reducers 发生了变化，则替换整个 reducers */
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers') // eslint-disable-line
        store.replaceReducer(nextRootReducer)
      })
    }
  }

  persistStore(store, {
    whitelist: [
    ],
  }, () => {
    /* store 中的数据恢复完毕后发布数据恢复成功事件 */
    PubSub.publish('STORE/REHYDRATION_STORE_SUCCEED')
  })

  return store
}

export default configStore
