import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PhoneLogSchema = new Schema({
  phone: String,
  code: String,
  createTime: {
    type: Date,
    default: Date.now,
    index: true,
  },
  expireTime: {
    type: Date,
    default: Date.now,
    index: {
      expireAfterSeconds: 300,
    },
  },
});
mongoose.model('PhoneLog', PhoneLogSchema, 'PhoneLogs');
