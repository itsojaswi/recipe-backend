const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      validate: {
        validator: function (value) {
          return (
            validator.isAlphanumeric(value, 'en-US', { ignore: ' _' }) &&
            value.length >= 3 &&
            value.length <= 30
          )
        },
        message:
          'Username can only contain letters, numbers, and underscores, and must be between 3 and 30 characters long'
      }
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    profile: {
      bio: { type: String },
      avatar: { type: String }
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'chef'],
      default: 'user'
    }
  },
  { timestamps: true }
)

// Static signup method
userSchema.statics.signup = async function (username, email, password) {
  // Validation
  if (!username || !email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  // Check for existing user
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use.')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, email, password: hash })

  return user
}

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email.')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
