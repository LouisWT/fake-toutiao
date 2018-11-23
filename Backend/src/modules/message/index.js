import crypto from 'crypto';
import SMSClient from '@alicloud/sms-sdk';
import {
  ossConnectConfig,
  aliMessage,
} from 'config';

// 短信验证码 ：使用同一个签名，对同一个手机号码发送短信验证码，1条/分钟，5条/小时，10条/天。
// 一个手机号码通过阿里云短信服务平台只能收到40条/天。
// （天的计算方式是是当下时间往后推24小时，例如2017年8月24日：11:00发送一条验证码短信，计算限流方式是2017年8月23日11:00点到8月24日：11:00点，是否满40条）
const sendVerificationCode = async (phone, code) => {
  const { accessKeyId, accessKeySecret } = ossConnectConfig;
  const smsClient = new SMSClient({
    accessKeyId,
    secretAccessKey: accessKeySecret,
  });
  const messageBody = {
    ...aliMessage,
    PhoneNumbers: phone,
    TemplateParam: `{"code":"${code}"}`,
  };
  const result = await smsClient.sendSMS(messageBody);
  return result;
};

const randomCode = () => {
  let num = '';
  for (let i = 0; i < 6; i += 1) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};

const verifyPhoneNumber = async (phone) => {
  const code = randomCode();
  const md5 = crypto.createHash('md5');
  md5.update(code);
  const md5Code = md5.digest('hex');
  const { Code } = await sendVerificationCode(phone, code);
  let [status, body] = [200, md5Code];
  if (Code !== 'OK') {
    [status, body] = [500, 'sent message fail'];
    console.error(Code);
  }
  return [status, body];
};


export {
  sendVerificationCode,
  verifyPhoneNumber,
};
