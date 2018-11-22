import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const JobLogSchema = new Schema({
  accountId: {
    type: Number,
    index: true,
  },
  docId: {
    type: ObjectId,
    ref: 'Doc',
    index: true,
  },
  success: {
    type: Boolean,
    default: false,
  },
  expireTime: {
    type: Date,
    default: Date.now,
    index: {
      expireAfterSeconds: 604800,
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

mongoose.model('JobLog', JobLogSchema, 'JobLogs');
