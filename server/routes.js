const express = require('express')
const router = express.Router()
const User = require('./models/user')

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.json({ success: true, name: req.body.name })
  } catch (err) {
    console.log('save user err...', err)
  }
})

module.exports = router
