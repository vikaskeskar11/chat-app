const express = require('express')
const router = express.Router()
const messageService = require('../services/messageService')

router.get('/', async (req, res) => {
  try {
    const results = await messageService.get(req.user.userId)
    res.send(results)
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router
