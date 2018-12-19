const Router = require('koa-router')();

const AdminController = require('./../controllers/AdminController');


const routers = Router
    .get('/', AdminController.index)
    .get('/list', AdminController.list)
    .get('/form', AdminController.form);

module.exports = routers;