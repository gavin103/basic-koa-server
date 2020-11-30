const router = require('@koa/router')();
const User = require('../../models/Users');
const { encrypt, validate } = require('../../utils/passport');
const getAvatar = require('../../utils/getAvatar')
const _ = require('lodash')
router.post('/register', async ctx => {
  const { email, name, password, avatar } = ctx.request.body
  const user = await User.findOne({ email })
  if (user) {
    ctx.fail('邮箱已占用', -1)
  } else {
    const avatar = getAvatar(email)
    const userConf = { avatar, email, name }
    userConf.password = await encrypt(password)
    const newUser = new User(userConf)
    const res = await newUser.save()
    if (res) {
      ctx.success({email,email,avatar})
    } else {
      ctx.fail()
    }
  }
})

router.post('/login', async ctx => {
  const { email, password } = ctx.request.body
  const user = await User.findOne({ email })
  if (user) {
    const res = await validate(password, user.password)
    if (res) {
      ctx.success(_.pick(user, ['avatar', 'name', 'email']))
    } else {
      ctx.fail('密码错误')
    }
  } else {
    ctx.fail('该邮箱未注册使用')
  }
})

router.post('/update', async ctx => {
  const { email, password, newPassword, name } = ctx.request.body
  const user = await User.findOne({ email }) // 数据库中已有
  if (user) {
    const res = await validate(password, user.password)
    if (res) {
      const updateRes = await User.update(
        { email },
        {
          name: name || user.name,
          avatar: getAvatar(email),
          password: await encrypt(newPassword || password)

        }
      );
      if (updateRes.nModified) {
        const updatedUser = await User.findOne({ email })
        ctx.success(_.pick(updatedUser, ['avatar', 'name', 'email']))
      } else {
        ctx.fail('更新失败')
      }
    } else {
      ctx.fail('密码错误')
    }
  } else {
    ctx.fail('该邮箱未注册使用')
  }
})

module.exports = router
