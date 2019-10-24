const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const { authentication, authorizationAnswer } = require('../middlwares/auth')

router.get('/', AnswerController.findAll)
router.get('/:answerId', AnswerController.findOne)
router.use(authentication)
router.get('/:userId/myanswers', AnswerController.myAnswers)
router.patch('/:answerId/upvote', AnswerController.upvote)
router.patch('/:answerId/downvote', AnswerController.downvote)
router.patch('/:answerId/update', authorizationAnswer, AnswerController.update)

module.exports = router
