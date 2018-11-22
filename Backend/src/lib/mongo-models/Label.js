import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;

const DocLabelSchema = new Schema({
  // 账号ID
  accountId: {
    type: Number,
    index: true,
  },
  // 标签内容
  text: {
    type: String,
    index: true,
    required: true,
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

mongoose.model('Label', DocLabelSchema, 'Labels');
