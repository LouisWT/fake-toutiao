import mongoose from 'mongoose';

const PhoneLog = mongoose.model('PhoneLog');

const deletePhoneLog = (phoneCode) => {
  return PhoneLog.deleteOne(phoneCode);
};

export {
  deletePhoneLog,
};
