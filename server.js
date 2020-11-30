const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const routerResponse = require('./middleware/routerResponse')

const app = new Koa();
const router = new Router();

// 路由配置
router.use('/users', require('./routes/users').routes());
router.use('/api/goods', require('./routes/api/goods').routes());

app
  .use(bodyParser())
  .use(routerResponse())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => { console.log("服务已经启动:3000") });