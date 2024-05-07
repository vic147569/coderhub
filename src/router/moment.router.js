const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

// create
momentRouter.post('/', verifyAuth, momentController.create)
// read
momentRouter.get('/', momentController.list)
momentRouter.get('/:momentId', momentController.detail)
// delete
momentRouter.delete(
  '/:momentId',
  verifyAuth,
  verifyPermission,
  momentController.remove
)
// update
momentRouter.patch(
  '/:momentId',
  verifyAuth,
  verifyPermission,
  momentController.update
)
// add label to moment
/**
|--------------------------------------------------
1. login ?
2. permision to add label to moment ?
3. label exist in database ?
   - yes -> use
   - no -> add label to database
4. add label-moment to relation table
|--------------------------------------------------
*/
momentRouter.post(
  '/:momentId/labels',
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  momentController.addLabels
)

module.exports = momentRouter
