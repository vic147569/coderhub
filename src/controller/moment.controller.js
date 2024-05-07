const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    // 1. get content
    const { content } = ctx.request.body

    // get user id
    const { id } = ctx.user

    // save content to database
    const result = await momentService.create(content, id)

    ctx.body = { code: 0, message: 'create moment success !!', data: result }
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await momentService.queryList(offset, size)
    ctx.body = {
      code: 0,
      data: result
    }
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.queryById(momentId)
    ctx.body = {
      code: 0,
      data: result[0]
    }
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = {
      code: 0,
      message: 'Delete success',
      data: result
    }
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.update(content, momentId)
    ctx.body = {
      code: 0,
      message: 'update success',
      data: result
    }
  }

  async addLabels(ctx, next) {
    // 1. get labels
    const { labels } = ctx
    console.log(labels)
    const { momentId } = ctx.params

    try {
      // 2. add relation to relation table
      for (const label of labels) {
        // 2.1. relation already exist ?
        const isExists = await momentService.hasLabel(momentId, label.id)
        if (!isExists) {
          // 2.1.1. not exist => insert label
          const result = await momentService.addLabel(momentId, label.id)
        }
      }
      ctx.body = {
        code: 0,
        message: 'add label success'
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: 'add label fail'
      }
    }
  }
}

module.exports = new MomentController()
