import mongoose from 'mongoose';

const PhoneLog = mongoose.model('PhoneLog');

const getPhoneLog = (filter) => {
  return PhoneLog.findOne(filter);
};

export {
  getPhoneLog,
};
