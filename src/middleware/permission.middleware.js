const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const permissionService = require('../service/permission.service')

const verifyPermission = async (ctx, next) => {
  // 1. get login user id
  const { id } = ctx.user

  // 2. get resource name and id, name => moment/comment/user
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')

  // 2. check user_id == login user id
  const isPermission = await permissionService.checkResource(
    resourceName,
    resourceId,
    id
  )
  // no permission
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  // get permission
  await next()
}

module.exports = { verifyPermission }
