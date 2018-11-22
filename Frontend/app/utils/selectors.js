import { immutableObjectEmpty } from 'utils/constants'

/* 所有章节选择器 */
const allChaptersSelector = (state) => state.get('chapters') || immutableObjectEmpty

/* 所有评论选择器 */
const allCommentsSelector = (state) => state.get('comments') || immutableObjectEmpty

/* 所有文档选择器 */
const allDocumentsSelector = (state) => state.get('documents') || immutableObjectEmpty

/* 所有标签选择器 */
const allLabelsSelector = (state) => state.get('labels') || immutableObjectEmpty

/* 所有课程选择器 */
const allLibrariesSelector = (state) => state.get('libraries') || immutableObjectEmpty

/* 所有回复选择器 */
const allRepliesSelector = (state) => state.get('replies') || immutableObjectEmpty

/* 所有用户个人信息选择器 */
const allUsersSelector = (state) => state.get('users') || immutableObjectEmpty

/* 用户个人信息选择器 */
const myInformationSelector = (state) => state.get('mine') || immutableObjectEmpty

/* eslint-disable */
export {
  allChaptersSelector,
  allCommentsSelector,
  allDocumentsSelector,
  allLabelsSelector,
  allLibrariesSelector,
  allRepliesSelector,
  allUsersSelector,
  myInformationSelector,
}
/* eslint-disable */
