module.exports = function (app, dna) {
  // default responder
  app.use(function (req, res, next) {
    if (typeof res.code === 'number') {
      res.status(res.code)
    }
    if (typeof res.body !== 'undefined') {
      if (req.accepts('json') === 'json') {
        return res.json(res.body)
      } else {
        return res.send(res.body)
      }
    }
    if (res.template) {
      return res.render(res.template)
    }
    if (typeof res.code === 'number') {
      return res.end()
    }
    next() // forward to default not found handler
  })
  // default not found handler
  app.use(function (req, res, next) {
    res.status(404)
    if (dna.views) {
      res.render('404')
    } else {
      res.end()
    }
  })
  // default error handler
  app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).end()
  })
}
