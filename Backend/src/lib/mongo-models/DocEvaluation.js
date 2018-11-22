import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;

const DocEvaluationSchema = new Schema({
  // 给文档点赞的用户ID
  approve: [Number],
  // 给文档进行的评分操作
  rating: [{
    accountId: Number,
    star: Number,
  }, {
    _id: false,
    id: false,
  }],
  ratingStatis: {
    star5: {
      type: Number,
      default: 0,
    },
    star4: {
      type: Number,
      default: 0,
    },
    star3: {
      type: Number,
      default: 0,
    },
    star2: {
      type: Number,
      default: 0,
    },
    star1: {
      type: Number,
      default: 0,
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

mongoose.model('DocEvaluation', DocEvaluationSchema, 'DocEvaluations');
