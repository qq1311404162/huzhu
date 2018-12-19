const Router = require('koa-router')();

const Admin = require('./admin');

// 后台页面路由
Router.use('/admin', Admin.routes(), Admin.allowedMethods());

module.exports = Router;


