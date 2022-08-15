const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: { type: String },
  email: { type: String, required: [true, 'El mail es obligatorio'], unique: true },
  password: { type: String },
  role: { type: String, required: true, enum: ['ADMIN_ROLE', 'USER_ROLE'], default: 'USER_ROLE' }
})

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}

module.exports = model('User', UserSchema)
