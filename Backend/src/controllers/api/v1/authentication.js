import svgCaptcha from 'svg-captcha';
import crypto from 'crypto';
import { isReqRight } from 'app/middlewares/validate';
import {
  verifyPhoneNumber,
} from 'app/modules/message';
import {
  auth,
  messageAuth,
  generateToken,
} from 'app/middlewares/auth/index';

export default (router) => {
  router.get('/captcha', async (ctx, next) => {
    const captcha = svgCaptcha.create({
      inverse: false,
      fontSize: 36,
      noise: 2,
      width: 102,
      height: 40,
    });
    const sha = crypto.createHash('md5');
    sha.update(captcha.text);
    captcha.text = sha.digest('hex');
    ctx.body = captcha;
    ctx.status = 200;
    await next();
  });

  router.post('/message', async (ctx, next) => {
    ctx.checkBody('phone').notEmpty().isMobilePhone('', 'zh-CN');
    if (!isReqRight(ctx)) return;
    const { phone } = ctx.request.body;
    const [status, body] = await verifyPhoneNumber(phone);
    ctx.status = status;
    ctx.body = body;
    await next();
  });
  /**
   * 用户注册
   */
  router.post('/phone', async (ctx, next) => {
    ctx.checkBody('phone').notEmpty().isMobilePhone('', 'zh-CN');
    ctx.checkBody('password').notEmpty();
    ctx.checkBody('code').notEmpty();
    // UserAgent 可以是 pc mobile
    ctx.checkBody('ua').notEmpty();
    if (!isReqRight(ctx)) {
      return;
    }
    await next();
  },
  messageAuth(),
  generateToken(),
  );

  router.post('/login', async (ctx, next) => {
    ctx.checkBody('phone').notEmpty().isMobilePhone('', 'zh-CN');
    ctx.checkBody('password').notEmpty();
    ctx.checkBody('ua').notEmpty();
    if (!isReqRight(ctx)) {
      return;
    }
    await next();
  },
  auth(),
  generateToken(),
  );
};
