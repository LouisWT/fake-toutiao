import mongoose from 'mongoose';

const AccessLogs = mongoose.model('AccessLog');
const OperationLogs = mongoose.model('OperationLog');

const addAccessLog = async (param) => {
  try {
    const log = param;
    await AccessLogs.create(log);
  } catch (error) {
    console.error(error);
  }
};

const addOperationLog = async (param) => {
  try {
    const log = param;
    await OperationLogs.create(log);
  } catch (error) {
    console.error(error);
  }
};

export {
  addAccessLog,
  addOperationLog,
};
