const fs = require('fs')

function registerRouters(app) {
  // 1. read all file from ./
  const files = fs.readdirSync(__dirname)

  // 2. iterate each file
  for (const file of files) {
    if (!file.endsWith('.router.js')) continue
    const router = require(`./${file}`)

    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouters
