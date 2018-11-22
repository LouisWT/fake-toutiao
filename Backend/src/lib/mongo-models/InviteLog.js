import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const InviteLogSchema = new Schema({
  // 账号ID
  accountId: {
    type: Number,
    index: true,
    required: true,
  },
  // 被邀请者ID
  cooperatorId: Number,
  // 课堂ID
  library: {
    type: ObjectId,
    ref: 'Library',
    required: true,
  },
  // 是否已经被使用
  used: {
    type: Boolean,
    default: false,
  },
  // 是否已经被确认
  confirmed: {
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

mongoose.model('InviteLog', InviteLogSchema, 'InviteLogs');
