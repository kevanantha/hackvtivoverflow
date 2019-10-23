const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const { authentication, authorizationQuestion } = require('../middlwares/auth')

router.get('/', QuestionController.findAll)
router.get('/:questionId', QuestionController.findOne)
router.use(authentication)
router.post('/create', QuestionController.create)
router.delete('/:questionId/delete', authorizationQuestion, QuestionController.delete)
router.patch('/:questionId/upvote', QuestionController.upvote)
router.patch('/:questionId/downvote', QuestionController.downvote)
router.post('/:questionId/answer/submit', QuestionController.answerSubmit)

module.exports = router
