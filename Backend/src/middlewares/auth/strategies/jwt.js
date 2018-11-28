import _ from 'lodash';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
} from 'passport-jwt';
import { authConfig } from 'config';

import { getTokenById } from 'app/modules/account/retrieve';

const jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('QJWT');

// const cookieExtractor = (ctx) => {
//   let token = null;
//   console.log(ctx);
//   // if (ctx.cookies) {
//   //   token = ctx.cookies.get('qingtoken', { signed: true });
//   // }
//   return token;
// };

const options = {
  jwtFromRequest,
  secretOrKey: authConfig.jwtSecret,
  passReqToCallback: true,
};

export default new JwtStrategy(options, async (request, jwtPayload, done) => {
  try {
    const { id, ua } = jwtPayload;
    const tokenInDB = await getTokenById(id, ua);
    if (!_.isEmpty(tokenInDB) && tokenInDB.token) {
      done(null, { ...jwtPayload });
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

