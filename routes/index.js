const express = require('express')
const router = express.Router()
const path = require('path')

/* GET home page. */
router.get('*', (req, res, next) => {
  res.sendFile(path.join(path.resolve(__dirname, '..'), 'public/login.html'))
})

module.exports = router
