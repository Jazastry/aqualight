const path = require('path')
module.exports = function (app, dna) {
  let packagejson = require(path.join(__dirname, '../package.json'))
  app.use(function (req, res, next) {
    res.locals.packagejson = packagejson
    next()
  })
}
