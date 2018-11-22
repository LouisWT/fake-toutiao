import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  // 账号ID
  accountId: {
    type: Number,
    index: true,
  },
  // 每个文档有哪些未读评论
  docComment: [{
    // 所属的文档
    type: ObjectId,
    ref: 'Doc',
  }],
});

mongoose.model('Message', MessageSchema, 'Messages');
