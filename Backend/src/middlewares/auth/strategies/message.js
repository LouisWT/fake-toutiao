import _ from 'lodash';
import { Strategy as CustomStrategy } from 'passport-custom';
import {
  verifyPhoneCode,
} from 'app/modules/message';

export default new CustomStrategy(async (ctx, done) => {
  try {
    const { phone, code } = ctx.body;
    const verifyResult = await verifyPhoneCode(phone, code);
    if (!_.isEmpty(verifyResult)) {
      const { id, exist } = verifyResult;
      const account = {
        id,
        exist,
        ua: 'pc',
      };
      done(null, account);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
