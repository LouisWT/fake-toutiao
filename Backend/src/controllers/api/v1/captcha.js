import svgCaptcha from 'svg-captcha';
import crypto from 'crypto';

export default (router) => {
  router.get('/', async (ctx, next) => {
    const captcha = svgCaptcha.create({
      inverse: false,
      fontSize: 36,
      noise: 2,
      width: 102,
      height: 40,
    });
    const sha = crypto.createHash('sha1');
    sha.update(captcha.text);
    captcha.text = sha.digest('hex');
    ctx.body = captcha;
    ctx.status = 200;
    await next();
  });
};
