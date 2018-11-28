import _ from 'lodash';
import passport from 'koa-passport';
import unless from 'koa-unless';
import jwt from 'jsonwebtoken';
import { authConfig } from 'config';

import JwtStrategy from 'app/middlewares/auth/strategies/jwt';
import LocalStrategy from 'app/middlewares/auth/strategies/local';
import MessageStrategy from 'app/middlewares/auth/strategies/message';

import { getTokenById } from 'app/modules/account/retrieve';
import { cacheToken } from 'app/modules/account/create';
import { updateToken } from 'app/modules/account/update';

passport.use('jwt', JwtStrategy);
passport.use('local', LocalStrategy);
passport.use('message', MessageStrategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  const authenticateFn = passport.authenticate('jwt', { session: false });
  authenticateFn.unless = unless;
  return authenticateFn;
};

const auth = () => {
  return passport.authenticate('local', { session: false });
};

const messageAuth = () => {
  return passport.authenticate('message', { session: false });
};

const mobileAuth = () => {
  return passport.authenticate('mobile', {
    session: false,
  });
};

const genJWT = (user) => {
  const days = '30d';
  const _token = jwt.sign(user, authConfig.jwtSecret, {
    expiresIn: days,
  });
  const token = `QJWT ${_token}`;
  return token;
};

const verifyJWT = (token) => {
  let _token = token;
  if (_.startsWith(token, 'QJWT ')) {
    _token = token.replace('QJWT ', '');
  }
  return jwt.verify(_token, authConfig.jwtSecret);
};

const generateToken = () => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    if (user === false) {
      ctx.status = 401;
    } else {
      const { id, ua, type } = user;
      const existToken = await getTokenById(id, ua);
      const token = genJWT(user);
      if (!_.isEmpty(existToken)) {
        await updateToken(id, ua, token);
      } else {
        await cacheToken(id, ua, token);
      }
      switch (ua) {
        case 'pc': {
          ctx.cookies.set('token', token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false,
            signed: true,
          });
          ctx.cookies.set('username', id, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: false,
            signed: true,
          });
          if (type === 0) {
            ctx.redirect('/signup_profile');
          } else {
            ctx.redirect('/homepage');
          }
          ctx.status = 302;
          ctx.body = token;
          break;
        }
        default:
          break;
      }
    }
    await next();
  };
};

export {
  initialize,
  authenticate,
  auth,
  messageAuth,
  mobileAuth,
  verifyJWT,
  genJWT,
  generateToken,
};
