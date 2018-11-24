import mongoose from 'mongoose';

const PhoneLog = mongoose.model('PhoneLog');

const updatePhoneLog = (filter, updater) => {
  return PhoneLog.updateOne(filter, updater);
};

export {
  updatePhoneLog,
};
