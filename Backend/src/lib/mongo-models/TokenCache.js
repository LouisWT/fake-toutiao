import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TokenCacheSchema = new Schema({
  accountId: {
    type: Number,
    required: true,
  },
  userAgent: {
    type: String,
  },
  token: {
    type: String,
    required: true,
    index: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

mongoose.model('TokenCache', TokenCacheSchema, 'TokenCaches');
