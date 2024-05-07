const fs = require('fs')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { UPLOAD_PATH } = require('../config/path')

class UserController {
  async create(ctx, next) {
    // 1. receive request
    const user = ctx.request.body

    // 2. save user data to database
    const result = await userService.create(user)

    // 3. response
    ctx.body = {
      message: 'create user success',
      data: result
    }
  }

  async showAvatarImage(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()
