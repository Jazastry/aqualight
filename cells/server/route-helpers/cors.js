var cors = require('cors')
var corsOptions = {
  origin: function (origin, callback) {
    console.log('origin', origin)
    callback(null, true)
  }
}
var corsMiddleware = cors(corsOptions)
module.exports = corsMiddleware
