import _ from 'lodash';
import { Strategy as CustomStrategy } from 'passport-custom';
import { verifyUserPassword } from 'app/modules/account/retrieve';

export default new CustomStrategy(async (ctx, done) => {
  try {
    const { phone, password, ua } = ctx.body;
    const verifyResult = await verifyUserPassword('phone=:phone', { phone }, password);
    if (!_.isEmpty(verifyResult)) {
      const account = {
        id: verifyResult.id,
        ua,
      };
      done(null, account);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
