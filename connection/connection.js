const mongoose = require('mongoose')
const config = require('config')
const logger = require('../logger/logger')
mongoose.set('debug', true)
class DBConnection {
  constructor () {
    this.isConnectedBefore = false
    logger.info('DBConnection:connect: Initiating DB Connection')
    this.connect()
  }

  connect () {
    const url = `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}?authSource=admin`
    mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    mongoose.connection.on('error', error => {
      logger.error('DBConnection:connect: ', { msg: 'Could not connect to MongoDB', error: error })
    })

    mongoose.connection.on('disconnected', () => {
      logger.error('DBConnection:connect: ', { msg: 'Lost MongoDB connection...' })
      if (!this.isConnectedBefore) { setTimeout(this.connect, 5000) }
    })

    mongoose.connection.on('connected', () => {
      this.isConnectedBefore = true
      require('../services/initService').init()
      logger.info('DBConnection:connect: ', { msg: 'Connection established to MongoDB' })
    })

    mongoose.connection.on('reconnected', () => {
      logger.error('DBConnection:connect: ', { msg: 'Reconnected to MongoDB' })
    })
  }
}

module.exports = new DBConnection()
