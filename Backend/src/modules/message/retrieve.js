import mongoose from 'mongoose';
import 'app/lib/mongo-models/PhoneLog';

const PhoneLog = mongoose.model('PhoneLog');

const getPhoneLog = (filter) => {
  return PhoneLog.findOne(filter);
};

export {
  getPhoneLog,
};
