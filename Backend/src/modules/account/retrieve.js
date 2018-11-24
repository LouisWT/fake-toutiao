import mongoose from 'mongoose';
import 'app/lib/mongo-models/TokenCache';
import { queryOne } from 'app/lib/mysql';

const TokenCache = mongoose.model('TokenCache');

const queryUserByPhone = async (phone) => {
  const sql = 'SELECT id FROM account WHERE phone = :phone AND deleted = 0';
  return queryOne(sql, { phone });
};

const getTokenById = (accountId, userAgent) => {
  return TokenCache.findOne({
    accountId,
    userAgent,
  });
};

export {
  queryUserByPhone,
  getTokenById,
};
