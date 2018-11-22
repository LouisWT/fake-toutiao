import { schema } from 'normalizr'

/* 标签 */
const Label = new schema.Entity('label')

/* 标签集合 */
const Labels = new schema.Array(new schema.Entity('labels'))

/* 章节 */
const Chapter = new schema.Entity('chapter')

/* 章节集合 */
const Chapters = new schema.Array(new schema.Entity('chapters'))

/* 用户对评论的回复 */
const Replies = new schema.Array(new schema.Entity('replies'))

/* 用户评论 */
const Comment = new schema.Entity('comment', {
  replies: Replies,
})

/* 用户评论集合 */
const Comments = new schema.Array(new schema.Entity('comments', {
  replies: Replies,
}))

/* 文档 */
const Document = new schema.Entity('document', {
  labels: Labels,
  comments: Comments,
})

/* 文档集合 */
const Documents = new schema.Array(new schema.Entity('documents'))

/* 课程 */
const Library = new schema.Entity('library', {
  chapters: Chapters,
})

/* 课程集合 */
const Libraries = new schema.Array(new schema.Entity('libraries', {
  chapters: Chapters,
}))

/* 用户个人信息集合 */
const Users = new schema.Array(new schema.Entity('users'))

/* eslint-disable */
export {
  Chapter,
  Chapters,
  Comment,
  Comments,
  Document,
  Documents,
  Label,
  Labels,
  Libraries,
  Library,
  Replies,
  Users,
}
/* eslint-disable */
