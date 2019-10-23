const router = require('express').Router()
const userRoutes = require('./userRoutes')
const questionRoutes = require('./questionRoutes')

router.get('/', (req, res, next) => res.send('Welcome'))
router.use('/users', userRoutes)
router.use('/questions/', questionRoutes)

module.exports = router
