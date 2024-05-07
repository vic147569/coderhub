const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    // 1. get params from body
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user

    console.log(content, momentId, id)
    // 2. save content to database
    const result = await commentService.create(content, momentId, id)
    console.log(result)
    ctx.body = {
      code: 0,
      message: 'comment success',
      data: result
    }
  }

  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user

    const result = await commentService.reply(content, momentId, commentId, id)

    ctx.body = {
      code: 0,
      message: 'reply success',
      data: result
    }
  }
}

module.exports = new CommentController()
