import crypto from 'crypto';

const md5 = (buffer) => {
  return crypto.createHash('md5').update(buffer).digest('base64');
};
const sha1 = (stringToSign, secret) => {
  return crypto.createHmac('sha1', secret).update(stringToSign).digest().toString('base64');
};

export {
  md5,
  sha1,
};
