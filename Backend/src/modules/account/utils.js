import _ from 'lodash';
import { generateOssUrl } from 'app/modules/alioss';

const formatUser = (user) => {
  if (_.isEmpty(user)) return {};
  const { id, name, avatar, introduction, phone } = user;
  return {
    accountId: id,
    username: name,
    avatar: avatar ? generateOssUrl(avatar) : '',
    introduction,
    phone,
  };
};

export {
  formatUser,
};
