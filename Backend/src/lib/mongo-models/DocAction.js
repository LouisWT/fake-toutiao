import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DocActionSchema = new Schema({
  // 文档对应的录音,是OSS中的文件名
  accountId: {
    type: Number,
    index: true,
  },
  recording: String,
  recordingSize: Number,
  totalSize: Number,
  subtitle: [{
    beginTime: Number,
    endTime: Number,
    text: String,
  }],
  hasSubtitle: {
    type: Number,
    default: 0,
  },
  version: {
    type: ObjectId,
    ref: 'PicVersion',
  },
  duration: Number,
  ossid: String,
  json: String,
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

mongoose.model('DocAction', DocActionSchema, 'DocActions');
