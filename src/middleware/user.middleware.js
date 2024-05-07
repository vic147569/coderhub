const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS
} = require('../config/error')
const userService = require('../service/user.service')
const md5password = require('../utils/md5-password')

const verifyUser = async (ctx, next) => {
  // 1. name = null or password = null ?
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 2. name duplicate ?
  const users = await userService.findUserByName(name)
  if (users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }
  // 3. next
  await next()
}

const handlePassword = async (ctx, next) => {
  // get password
  const { password } = ctx.request.body
  // encrypt
  ctx.request.body.password = md5password(password)
  // next
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
