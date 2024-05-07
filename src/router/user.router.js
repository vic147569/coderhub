const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// create router
const userRouter = new KoaRouter({ prefix: '/users' })

// login
userRouter.post('/', verifyUser, handlePassword, userController.create)

// avatar
userRouter.get('/avatar/:userId', userController.showAvatarImage)

module.exports = userRouter
