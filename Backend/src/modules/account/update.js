import mongoose from 'mongoose';

const TokenCache = mongoose.model('TokenCache');

const updateToken = (accountId, userAgent, token) => {
  return TokenCache.updateOne({
    accountId,
    userAgent,
  }, {
    token,
  });
};

export {
  updateToken,
};
