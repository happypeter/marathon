const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: String,
    phone: String,
    gender: String,
    identity: String,
    number: String,
    size: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
