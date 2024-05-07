const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  // 1. get label from request
  const { labels } = ctx.request.body

  const newLabels = []

  // 2. query label check exist in label database ?
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = { name }
    if (result) {
      // get label id
      labelObj.id = result.id
    } else {
      // add label to database
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId
    }
    newLabels.push(labelObj)
  }

  // 3. all label have a id
  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyLabelExists
}
