const errorHandle = (ctx, next) => {

    return next().catch((err) => {

        if(err.status === 401) {

            ctx.status = 401;

            return ctx.sendError('00004', '未授权');
        }else {
            throw err;
        }
    });
}

module.exports = errorHandle;