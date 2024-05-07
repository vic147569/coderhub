const app = require('../app')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED
} = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = 'name or password is null !!!'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = 'Name is already exist !!!!'
      break
    case NAME_IS_NOT_EXISTS:
      code: -1003
      message = 'Name is not exists !!!'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = 'Password is incorrect!!!'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = 'Unauthorization token!!!'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006
      message = 'Operation is not allowed!!!'
      break
  }

  ctx.body = { code, message }
})
