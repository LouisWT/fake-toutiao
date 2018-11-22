const isReqRight = (ctx) => {
  if (ctx.errors) {
    ctx.status = 400;
    ctx.body = {
      code: -1,
      errors: ctx.errors,
    };
  }
  return !ctx.errors;
};

export {
  isReqRight,
};
