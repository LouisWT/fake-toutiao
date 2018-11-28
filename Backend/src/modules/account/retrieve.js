import mongoose from 'mongoose';
import 'app/lib/mongo-models/TokenCache';
import { queryOne } from 'app/lib/mysql';

const TokenCache = mongoose.model('TokenCache');

const queryUserByPhone = async (phone) => {
  const sql = 'SELECT id, type FROM account WHERE phone = :phone AND deleted = 0';
  return queryOne(sql, { phone });
};

const getTokenById = (accountId, userAgent) => {
  return TokenCache.findOne({
    accountId,
    userAgent,
  });
};

const verifyUserPassword = async (filter, filterParam, password) => {
  const sql = `SELECT id, type FROM account WHERE ${filter} AND password=:password AND deleted = 0`;
  return queryOne(sql, {
    ...filterParam,
    password,
  });
};

const getUser = async (filter, filterParam) => {
  const sql = `SELECT * FROM account WHERE ${filter} AND deleted = 0`;
  return queryOne(sql, {
    ...filterParam,
  });
};

export {
  queryUserByPhone,
  getTokenById,
  verifyUserPassword,
  getUser,
};
