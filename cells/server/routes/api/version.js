module.exports = function (plasma, dna, helpers) {
  return {
    'GET': async function (req, res) {
      res.body = res.locals.packagejson.version
    },
    'POST': helpers.forbidden,
    'PUT': helpers.forbidden,
    'DELETE': helpers.forbidden
  }
}
