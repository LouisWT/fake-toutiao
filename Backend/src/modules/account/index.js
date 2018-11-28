import _ from 'lodash';
import { ossFile } from 'config';
import { getUser } from 'app/modules/account/retrieve';
import { updateUser } from 'app/modules/account/update';
import {
  formatUser,
} from 'app/modules/account/utils';
import {
  uploadToOSS,
} from 'app/modules/alioss';

const getDupName = async (name) => {
  if (!name) return [200, 'empty name'];
  const result = await getUser('name=:name', { name });
  let body = 'exist';
  if (_.isEmpty(result) || !result.id) body = 'not exist';
  return [200, body];
};

const completeUserInfo = async (accountId, param, avatar) => {
  const updater = [];
  const updateParam = {};
  const { type, username, introduction } = param;
  const filter = 'id=:accountId';
  const filterParam = { accountId };
  if (type) {
    updater.push('type=:type');
    let typeIndex = 0;
    if (type === 'personal') typeIndex = 1;
    else if (type === 'enterprise') typeIndex = 2;
    updateParam.type = typeIndex;
  }
  if (username) {
    updater.push('name=:name'); updateParam.name = username;
  }
  if (introduction) {
    updater.push('introduction=:introduction');
    updateParam.introduction = introduction;
  }
  if (avatar) {
    const filePath = await uploadToOSS(avatar, ossFile.avatar);
    updater.push('avatar=:avatar');
    updateParam.avatar = filePath;
  }
  if (!_.isEmpty(updateParam)) {
    await updateUser(updater.join(','), updateParam, filter, filterParam);
  }
  const user = await getUser(filter, filterParam);
  return [200, formatUser(user)];
};

export {
  getDupName,
  completeUserInfo,
};
