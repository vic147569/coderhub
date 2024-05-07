const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const commentController = require('../controller/comment.controller')

const commentRouter = new KoaRouter({ prefix: '/comment' })

// create
commentRouter.post('/', verifyAuth, commentController.create)
commentRouter.post('/reply', verifyAuth, commentController.reply)
// read
// update
// delete

module.exports = commentRouter
