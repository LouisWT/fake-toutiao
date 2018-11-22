import mongoose from 'mongoose';

import {
  transform,
} from 'app/lib/utils/mongo';

const Schema = mongoose.Schema;

const PicVersionSchema = new Schema({
  // 说是 totalSize 其实是全部图片的size，命名失误
  totalSize: Number,
  pictures: [String],
  plusPic: [{
    // 新增加的图片相对于原来图片数组插空的位置
    position: Number,
    // 如果多张图片的poisition相同，对同一个插空，使用这个字段确定图片的先后顺序
    index: Number,
    // 图片的链接地址
    src: String,
    // 图片的大小
    size: Number,
  }],
}, {
  toJSON: { transform },
  toObject: { transform },
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updatedTime',
  },
});

mongoose.model('PicVersion', PicVersionSchema, 'PicVersions');
