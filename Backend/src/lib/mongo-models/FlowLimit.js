import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;

const DataFlow = new Schema({
  // 账号ID
  accountId: {
    type: Number,
    index: true,
  },
  // 流量统计
  flow: {
    type: Number,
  },
  expireTime: {
    type: Date,
    default: Date.now,
    index: {
      expireAfterSeconds: 5184000,
    },
  },
}, {
  toJSON: { transform },
  toObject: { transform },
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updatedTime',
  },
});

mongoose.model('FlowLimit', DataFlow, 'FlowLimits');
