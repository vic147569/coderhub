const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION
} = require('../config/error')
const jwt = require('jsonwebtoken')
const userService = require('../service/user.service')
const md5password = require('../utils/md5-password')
const { PUBLIC_KEY } = require('../config/secret')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // name = null or password = null ?
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // user exist ?
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  // password correct ?
  if (user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }

  // pass user to controller for sign token
  ctx.user = user

  // next
  await next()
}

const verifyAuth = async (ctx, next) => {
  // 1. get token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')

  // 2. verify token
  try {
    // 1. verify
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    // 2. save token
    ctx.user = result

    // 3. next
    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
