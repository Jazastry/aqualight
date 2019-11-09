module.exports.createError = function (code, message) {
  var err = new Error()
  err.name = 'ApiError'
  err.code = code
  err.message = message
  err.errors = {
    base: {message}
  }
  return err
}

/*
  errors: {
    fieldName: {
      message: String
    }
  }
*/
module.exports.createValidationError = function (errors) {
  var err = new Error()
  err.name = 'ValidationError'
  err.code = 400
  err.message = 'ValidationError'
  err.errors = errors
  return err
}
