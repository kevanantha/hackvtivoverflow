const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid Email'
      ],
      validate: {
        validator(email) {
          return new Promise((resolve, reject) => {
            User.findOne({ email }).then(user => (user ? resolve(false) : resolve(true)))
          })
        },
        message: 'Email already taken'
      }
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
