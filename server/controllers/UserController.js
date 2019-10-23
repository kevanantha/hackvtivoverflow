const User = require('../models/User')
const { verifyPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = {
  async register(req, res, next) {
    try {
      const { email, name, password } = req.body
      const user = await User.create({
        email,
        name,
        password
      })
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name
      })
      res.status(201).json({ token, name: user.name })
    } catch (err) {
      next(err)
    }
  },
  async login(req, res, next) {
    try {
      const user = await User.findOne({
        email: req.body.email
      })

      if (user && verifyPassword(req.body.password, user.password)) {
        const token = generateToken({
          id: user._id,
          email: user.email,
          name: user.name
        })
        res.status(201).json({ token, name: user.name })
      } else {
        const err = new Error('Invalid email/password')
        err.name = 'AuthenticationError'
        next(err)
      }
    } catch (err) {
      next(err)
    }
  }
}
