const router = require('@koa/router')();
const Goods = require('../../models/Goods');
const pageSize = 10

router.get('/list', async ctx => {
  const { pageIndex, category, desc } = ctx.query
  const skipN = pageSize*pageIndex-pageSize
  const findConf = {};
  if(category) findConf.category = category
  if(desc) findConf.desc = desc
  const list = await Goods.find(findConf).skip(skipN).limit(pageSize)
  const total = await Goods.find(findConf).count()
  ctx.success({list,total,pageIndex})
})

router.post('/add', async ctx => {
  const { pn, desc, usage, quatity, category, maintainer } = ctx.request.body
  const oneGood = await Goods.findOne({ pn })
  if (oneGood) {
    ctx.fail('录入商品已存在于库存中')
  } else {
    const goodConf = {pn, desc, usage, quatity, category, maintainer}
    const newGood = new Goods(goodConf)
    const res = await newGood.save()
    if (res) {
      ctx.success()
    } else {
      ctx.fail()
    }
  }
})
router.post('/edit', async ctx => {
  const { pn, desc, usage, quatity, category, maintainer } = ctx.request.body
  const oneGood = await Goods.findOne({ pn })
  if (oneGood) {
    const updateRes = await Goods.update(
      { pn },
      {
        desc, usage, quatity, category, maintainer
      }
    );
    if (updateRes.nModified) {
      ctx.success()
    } else {
      ctx.fail('更新失败')
    }

  } else {
    ctx.fail('库存中未找到该商品')
  }
})

module.exports = router
