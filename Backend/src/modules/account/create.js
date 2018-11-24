import mongoose from 'mongoose';
import { queryOne } from 'app/lib/mysql';

const TokenCache = mongoose.model('TokenCache');

const insertPhoneUser = (phone) => {
  const sql = `
   INSERT INTO account (phone) VALUES (:phone)`;
  const param = { phone };
  return queryOne(sql, param);
};

const cacheToken = async (accountId, userAgent, token) => {
  return TokenCache.create({
    accountId,
    userAgent,
    token,
  });
};

export {
  insertPhoneUser,
  cacheToken,
};
