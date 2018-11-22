import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DocLibrarySchema = new Schema({
  // 账号ID
  accountId: {
    type: Number,
    index: true,
  },
  // 合作者ID，课堂才有这个字段
  cooperators: [Number],
  // 文件夹名称
  name: {
    type: String,
    index: true,
    required: true,
  },
  // 封面
  cover: String,
  // 子文件夹
  subLibrary: [{
    type: ObjectId,
    ref: 'Library',
  }],
  // 是否为子文件夹
  isSub: {
    type: Boolean,
    default: false,
  },
  // 是否为默认文件夹
  isDefault: {
    type: Boolean,
    default: false,
  },
  // 删除标记
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

mongoose.model('Library', DocLibrarySchema, 'Libraries');
