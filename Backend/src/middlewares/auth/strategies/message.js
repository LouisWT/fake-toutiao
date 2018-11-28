import _ from 'lodash';
import { Strategy as CustomStrategy } from 'passport-custom';
import {
  verifyPhoneCode,
} from 'app/modules/message';

export default new CustomStrategy(async (ctx, done) => {
  try {
    const { phone, code, password } = ctx.body;
    const verifyResult = await verifyPhoneCode(phone, code, password);
    if (!_.isEmpty(verifyResult)) {
      const { id, exist, type } = verifyResult;
      const account = {
        id,
        exist,
        ua: 'pc',
        type,
      };
      done(null, account);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
