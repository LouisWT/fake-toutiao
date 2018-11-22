import _ from 'lodash';
import { Strategy as CustomStrategy } from 'passport-custom';

export default new CustomStrategy(async (ctx, done) => {
  try {
    const { phone, code, ua } = ctx.body;
    const verifyResult = await verifyPhoneCode(phone, code);
    if (!_.isEmpty(verifyResult)) {
      const { id, complete, exist } = verifyResult;
      if (!exist) {
        await createDefaultSource(id);
      }
      const account = {
        id,
        ua,
        complete,
        state: 'phone',
      };
      done(null, account);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
