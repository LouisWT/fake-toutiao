import multer from 'koa-multer';
import {
  getDupName,
  completeUserInfo,
} from 'app/modules/account';

const uploader = multer({ dest: 'temp/avatars/' });

export default (router) => {
  router.get('/name', async (ctx, next) => {
    const { username } = ctx.request.query;
    const [status, body] = await getDupName(username);
    ctx.status = status;
    ctx.body = body;
    await next();
  });

  router.post('/message', uploader.single('avatar'), async (ctx, next) => {
    const accountId = ctx.state.user.id;
    const param = ctx.req.body;
    const avatar = ctx.req.file;
    const [status, body] = await completeUserInfo(accountId, param, avatar);
    ctx.status = status;
    ctx.body = body;
    await next();
  });
};
