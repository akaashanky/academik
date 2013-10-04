var util = require('util')

var AbstractError = function (msg, constr) {
  Error.captureStackTrace(this, constr || this)
  this.message = msg || 'Error'
}
util.inherits(AbstractError, Error)
AbstractError.prototype.name = 'Abstract Error'

var BadRequestError = function (msg) {
  BadRequestError.super_.call(this, msg, this.constructor)
}
util.inherits(BadRequestError, AbstractError)
BadRequestError.prototype.message = 'Bad Request Error'

module.exports = BadRequestError;