const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secret')

class LoginController {
  sign(ctx, next) {
    // 1. get user
    const { id, name } = ctx.user

    // 2. sign token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })

    // response sign token
    ctx.body = { code: 0, data: { id, name, token } }
  }

  test(ctx, next) {
    ctx.body = `verify success login/test`
  }
}

module.exports = new LoginController()
