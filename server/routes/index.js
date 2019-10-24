const router = require('express').Router()
const userRoutes = require('./userRoutes')
const questionRoutes = require('./questionRoutes')
const answerRoutes = require('./answerRoutes')

router.get('/', (req, res, next) => res.send('Welcome'))
router.use('/users', userRoutes)
router.use('/questions/', questionRoutes)
router.use('/answers/', answerRoutes)

module.exports = router
