class AdminController {

    static async index (ctx) {

        ctx.body = await ctx.render('admin/index');
    }

    static async list (ctx) {
        
        ctx.body = await ctx.render('admin/list');
    }

    static async form (ctx) {
        
        ctx.body = await ctx.render('admin/form');
    }
}

module.exports = AdminController;