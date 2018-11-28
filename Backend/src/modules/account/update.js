import mongoose from 'mongoose';
import { queryOne } from 'app/lib/mysql';

const TokenCache = mongoose.model('TokenCache');

const updateToken = (accountId, userAgent, token) => {
  return TokenCache.updateOne({
    accountId,
    userAgent,
  }, {
    token,
  });
};

const updateUser = async (updater, updateParam, filter, filterParam) => {
  const sql = `UPDATE account SET ${updater} WHERE ${filter} AND deleted=0`;
  return queryOne(sql, {
    ...updateParam,
    ...filterParam,
  });
};

export {
  updateToken,
  updateUser,
};
