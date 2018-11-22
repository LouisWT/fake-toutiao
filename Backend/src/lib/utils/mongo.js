import _ from 'lodash';
import moment from 'moment';

const transform = (doc, ret) => {
  const formatDoc = ret;
  if (doc.createTime && !_.isNumber(doc.createTime)) {
    formatDoc.createTime = moment(doc.createTime).unix();
  }
  if (doc.updatedTime && !_.isNumber(doc.updatedTime)) {
    formatDoc.updatedTime = moment(doc.updatedTime).unix();
  }
  formatDoc.id = doc._id;
  delete formatDoc._id;
  return formatDoc;
};

export {
  transform,
};
