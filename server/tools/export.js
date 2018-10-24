const mongoose = require('mongoose')
const fs = require('fs')
const User = require('../models/user')
const config = require('../config')

mongoose.Promise = global.Promise
mongoose.connect(
  config.url,
  { useNewUrlParser: true }
)

const fields = ['name', 'gender', 'phone', 'identity', 'size', 'number']

async function exportUsers() {
  const users = await User.find()
  const lines = users.map(user => {
    let str = ''
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      str = str ? `${str}    ${user[field]}` : user[field]
    }
    return `* ${str}`
  })

  fs.writeFileSync('./users.md', lines.join('\n'))
}

exportUsers()
  .then(() => {
    console.log('done!')
    process.exit(1)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
