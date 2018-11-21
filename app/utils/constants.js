import { fromJS } from 'immutable'

/* immutable 数据结构中的空对象  */
const immutableObjectEmpty = fromJS({})

/* immutable 数据结构中的空数组  */
const immutableArrayEmpty = fromJS([])

/* 26 个大写英文字母 */
const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']  // eslint-disable-line

/* 课程地址前缀 */
const classUrlPrefix = 'https://www.qingmooc.com/class/'

/* 播放地址前缀 */
const playerUrlPrefix = 'https://www.qingmooc.com/player/'

/*  静态资源网址后缀 */
const staticResourceUrlSuffix = process.env.NODE_ENV === 'production' ? '' : '?platform=localhost'

/* 微信授权邀请以后请求的服务器接口 */
const wxInviteOAuth2RedirectUrl = 'https://www.qingmooc.com/api/v1/authentication/invite'

/* 微信授权登录以后请求的服务器接口 */
const wxOAuth2RedirectUrl = 'https://www.qingmooc.com/api/v1/authentication'

/* 章节 reducers 的 Symbol 值 */
const chaptersReducersSymbol = Symbol('chaptersReducers')

/* 评论 reducers 的 Symbol 值 */
const commentsReducersSymbol = Symbol('commentsReducers')

/* 每个 container reducers 的 Symbol 值 */
const defaultReducersSymbol = Symbol('defaultReducers')

/* 文档 reducers 的 Symbol 值 */
const documentsReducersSymbol = Symbol('documentsReducers')

/* 标签 reducers 的 Symbol 值 */
const labelsReducersSymbol = Symbol('labelsReducers')

/* 课程 reducers 的 Symbol 值 */
const librariesReducersSymbol = Symbol('librariesReducers')

/* 用户个人信息 reducers 的 Symbol 值 */
const mineReducersSymbol = Symbol('mineReducers')

/* 回复 reducers 的 Symbol 值 */
const repliesReducersSymbol = Symbol('repliesReducers')

/* 所有用户个人信息 reducers 的 Symbol 值 */
const usersReducersSymbol = Symbol('usersReducers')

/* eslint-disable */
export {
  chaptersReducersSymbol,
  commentsReducersSymbol,
  defaultReducersSymbol,
  documentsReducersSymbol,
  immutableArrayEmpty,
  immutableObjectEmpty,
  labelsReducersSymbol,
  letter,
  librariesReducersSymbol,
  mineReducersSymbol,
  classUrlPrefix,
  playerUrlPrefix,
  repliesReducersSymbol,
  staticResourceUrlSuffix,
  usersReducersSymbol,
  wxInviteOAuth2RedirectUrl,
  wxOAuth2RedirectUrl,
}
/* eslint-disable */
