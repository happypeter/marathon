const express = require('express')
const router = express.Router()
const User = require('./models/user')

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    const newUser = await user.save()
    res.json({ success: true, user: { _id: newUser._id, name: req.body.name } })
  } catch (err) {
    console.log('save user err...', err)
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('name')
      .sort('-createdAt')
    res.json({ success: true, users: users })
  } catch (err) {
    console.log('get users err...', err)
  }
})

router.post('/check', async (req, res) => {
  const { identity } = req.body
  try {
    const user = await User.findOne({ identity })
    if (!user) {
      res.json({ success: false })
    } else {
      res.json({ success: true, user })
    }
  } catch (err) {
    console.log('check user info err...', err)
  }
})

module.exports = router
