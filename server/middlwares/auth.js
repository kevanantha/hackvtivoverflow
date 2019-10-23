const { verifyToken } = require('../helpers/jwt')
const Question = require('../models/Question')

const authentication = (req, res, next) => {
  try {
    const decode = verifyToken(req.headers.access_token)
    req.user = decode
    next()
  } catch (err) {
    next(err)
  }
}

const authorizationQuestion = (req, res, next) => {
  Question.findById(req.params.questionId).then(question => {
    if (question) {
      if (question.userId == req.user.id) {
        next()
      } else {
        const err = new Error('Pesmission denied')
        err.name = 'Unauthorized'
        next(err)
      }
    } else {
      const err = new Error('404 Not Found')
      err.name = 'NotFound'
      next(err)
    }
  })
}

module.exports = {
  authentication,
  authorizationQuestion
}
