const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: String,
    gender: String,
    phone: String,
    identity: String,
    contact: String,
    contactPhone: String,
    birthday: String,
    bloodType: String,
    size: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
