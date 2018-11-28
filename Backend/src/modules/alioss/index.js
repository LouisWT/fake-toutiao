import fs from 'fs';
import _ from 'lodash';
import { Wrapper as oss } from 'ali-oss';
import {
  ossConnectConfig,
  ossConfig,
  proxy,
} from 'config';

const ossClient = oss(ossConnectConfig);

const extractExtension = (filename) => {
  const extension = _
    .chain(filename)
    .split('.')
    .last()
    .value();
  return extension;
};

const extractName = (filePath) => {
  const name = _
    .chain(filePath)
    .split('/')
    .last()
    .value();
  return name;
};

const putToOSS = async (finalname, path, options = {}) => {
  const obj = await ossClient.put(finalname, path, options);
  let res = '';
  if (!_.isEmpty(obj) && obj.res.statusCode === 200) {
    res = obj.name;
  } else {
    res = false;
  }
  if (_.isString(path)) {
    try {
      fs.unlinkSync(path);
    } catch (error) {
      console.error('删除原始文件失败:', path);
    }
  }
  return res;
};

const uploadToOSS = (fileObj, file) => {
  const { originalname, filename, path } = fileObj;
  const fileExt = extractExtension(originalname);
  const finalname = `${file}${filename}.${fileExt}`;
  return putToOSS(finalname, path);
};

const streamUploadToOss = async (filename, readStream, file = '') => {
  const obj = await ossClient.putStream(`${file}${filename}`, readStream);
  let res;
  if (!_.isEmpty(obj) && obj.res.statusCode === 200) {
    res = obj.name;
  } else {
    res = false;
  }
  return res;
};

const uploadFiles = (files, index) => {
  const opts = _.map(files, (file) => {
    return uploadToOSS(file, index);
  });
  return Promise.all(opts);
};

const uploadPicToOSS = (dir, filePath, file) => {
  const filename = extractName(filePath);
  let finalname = '';
  if (dir) {
    finalname = `${file}${dir}/${filename}`;
  } else {
    finalname = `${file}${filename}`;
  }
  return putToOSS(finalname, filePath);
};

const uploadPictures = (dir, files, index) => {
  const opts = _.map(files, (file) => {
    return uploadPicToOSS(dir, file, index);
  });
  return Promise.all(opts);
};

const copyInOss = (target, source) => {
  return ossClient.copy(target, source);
};

const deleteFromOss = (target) => {
  return ossClient.delete(target);
};

const generateUrl = (fileNameInOss) => {
  const { url } = proxy;
  return `${url}${fileNameInOss}`;
};

const generateOssUrl = (fileNameInOss) => {
  const { ossUrl } = ossConfig;
  return `${ossUrl}${fileNameInOss}`;
};

export {
  putToOSS,
  uploadToOSS,
  uploadFiles,
  copyInOss,
  deleteFromOss,
  streamUploadToOss,
  generateUrl,
  generateOssUrl,
  uploadPictures,
  uploadPicToOSS,
  ossClient,
  extractName,
};
