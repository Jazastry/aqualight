var cors = require('cors')
var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}
var corsMiddleware = cors(corsOptions)
module.exports = corsMiddleware
