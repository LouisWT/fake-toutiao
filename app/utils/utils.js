import {
  is,
  Iterable,
} from 'immutable'
import { handleActions } from 'redux-actions'

/* 获取 URL 中的某一特定的查询字符串的值 */
const getQueryString = (search, name) => {
  const reg = new RegExp(`(\\?|&)${name}=([^&]+)(&|$)`)  // eslint-disable-line
  /* match 方法，如果正则表达式中不存在全局标志，那么如果没有匹配到字符串就返回 null，如果 */
  /* 匹配到字符串，则返回数组，数组中的第一个值是匹配的字符串，从第二个值开始，每个值是匹配正 */
  /* 则表达式中的每个分组的字符串，另外返回的数组还存在两个属性，一个是 index，表示匹配字符 */
  /* 串在原字符串中的起始位置，另一个是 input，表示对原字符串的引用 */
  /* 如果正则表达式中存在全局标志，那么如果没有匹配到字符串就返回 null，如果匹配到字符串就返 */
  /* 回数组，数组中的每一个值都是匹配到的字符串，但是不存在分组信息 */
  const result = search.match(reg)
  if (result !== null) {
    return result[2]
  }
  return null
}

/* 针对使用了 Immutable 数据类型的组件设计的 shouldComponentUpdate 函数 */
const shouldImmutableComponentUpdate = ({
  nextProps,
  nextState,
  thisProps,
  thisState,
}) => {
  nextProps = nextProps || {}
  nextState = nextState || {}
  thisProps = thisProps || {}
  thisState = thisState || {}
  const nextPropsKeys = Object.keys(nextProps)
  const nextStateKeys = Object.keys(nextState)
  const thisPropsKeys = Object.keys(thisProps)
  const thisStateKeys = Object.keys(thisState)

  if (nextPropsKeys.length !== thisPropsKeys.length ||
      nextStateKeys.length !== thisStateKeys.length) {
    return true
  }

  for (let i = 0, length = nextPropsKeys.length; i < length; i++) {
    if (Iterable.isIterable(nextProps[nextPropsKeys[i]])) {
      if (!is(nextProps[nextPropsKeys[i]], thisProps[nextPropsKeys[i]])) {
        return true
      }
    } else if (nextProps[nextPropsKeys[i]] !== thisProps[nextPropsKeys[i]]) {
      return true
    }
  }

  for (let i = 0, length = nextStateKeys.length; i < length; i++) {
    if (Iterable.isIterable(nextState[nextStateKeys[i]])) {
      if (!is(nextState[nextStateKeys[i]], thisState[nextStateKeys[i]])) {
        return true
      }
    } else if (nextState[nextStateKeys[i]] !== thisState[nextStateKeys[i]]) {
      return true
    }
  }

  return false
}

/* 改造 handleActions 方法，使得针对同一个 action 不同子状态的操作聚合到一起 */
const handleAllActions = (handlers, generalDefaultState) => (reducerType, specialDefaultState) => {
  const defaultState = specialDefaultState || generalDefaultState
  const handler = handleActions(handlers, defaultState)

  return (state = defaultState, originAction) => {
    const action = {
      ...originAction,
      reducerType,
    }

    return handler(state, action)
  }
}

/* eslint-disable */
export {
  getQueryString,
  handleAllActions,
  shouldImmutableComponentUpdate,
}
/* eslint-disable */
