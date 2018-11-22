import _ from 'lodash';
import querystring from 'querystring';
import passport from 'koa-passport';
import unless from 'koa-unless';
import jwt from 'jsonwebtoken';
import { authConfig } from 'config';

import JwtStrategy from 'app/middlewares/auth/strategies/jwt';
import LocalStrategy from 'app/middlewares/auth/strategies/local';
import MessageStrategy from 'app/middlewares/auth/strategies/message';

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

export {
  initialize,
  authenticate,
  auth,
  messageAuth,
  mobileAuth,
  verifyJWT,
  genJWT,
};
