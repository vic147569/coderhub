const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    // 1. get label name
    const { name } = ctx.request.body

    // 2. save label to database
    const result = await labelService.create(name)

    ctx.body = {
      code: 0,
      message: 'create label success',
      data: result
    }
  }

  async list(ctx, next) {
    ctx.body = `get label success`
  }
}

module.exports = new LabelController()
