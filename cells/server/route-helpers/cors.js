var cors = require('cors')

var corsMiddleware = cors({
  exposedHeaders: ['page', 'pages', 'total', 'limit'],
  origin: function (origin, callback) {
    callback(null, true)
  }
})
module.exports = corsMiddleware
