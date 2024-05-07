const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')

class FileController {
  async create(ctx, next) {
    // 1. get data from ctx
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    // 2. save data
    const result = await fileService.create(filename, mimetype, size, id)

    // 3. add avatar to users
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const result2 = await userService.updateUserAvatar(avatarUrl, id)

    ctx.body = {
      code: 0,
      message: 'Upload file success',
      data: avatarUrl
    }
  }
}

module.exports = new FileController()
