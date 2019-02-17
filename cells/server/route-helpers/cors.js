var cors = require('cors')
var corsMiddleware = cors({
  exposedHeaders: ['page', 'pages', 'total', 'limit'],
})
module.exports = corsMiddleware
