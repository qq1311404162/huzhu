const Router = require('koa-router')();

const Admin = require('./admin'),
    Api = require('./api');

// 后台页面路由
Router.use('/admin', Admin.routes(), Admin.allowedMethods());
Router.use('/api',Api.routes(), Api.allowedMethods());

module.exports = Router;


