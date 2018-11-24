import mongoose from 'mongoose';
import 'app/lib/mongo-models/PhoneLog';

const PhoneLog = mongoose.model('PhoneLog');

const insertPhoneLog = (phoneCode) => {
  return PhoneLog.create(phoneCode);
};

export {
  insertPhoneLog,
};
