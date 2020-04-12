const express = require('express')
const router = express.Router()
const userService = require('../services/userService')

router.post('/login', async (req, res) => {
  try {
    const result = await userService.login(req.body)
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
