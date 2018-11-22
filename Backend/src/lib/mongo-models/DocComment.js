import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DocCommentSchema = new Schema({
  // 评论者ID
  accountId: Number,
  // 被评论者ID，如果是第一个评论者，则没有此字段
  sourceId: Number,
  // 被评论的文档的ID，如果是回复则没有此字段
  doc: {
    type: ObjectId,
    ref: 'Doc',
    index: true,
  },
  // 评论的内容
  text: String,
  // 评论的图片，不一定有
  images: [String],
  // 对评论的回复
  replies: [{
    type: ObjectId,
    path: 'DocComment',
  }],
  // 对评论的点赞
  approve: [Number],
  // 是否被查看过
  view: {
    type: Boolean,
    default: false,
  },
  // 是否被置顶
  top: {
    type: Date,
    default: 0,
  },
  // 删除标志
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  toJSON: { transform },
  toObject: { transform },
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updatedTime',
  },
});

mongoose.model('DocComment', DocCommentSchema, 'DocComments');
