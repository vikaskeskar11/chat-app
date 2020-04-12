const path = require('path')
const config = require('config')
const winston = require('winston')
/**
 * @file Initialize the log transports (targets to store logs)
 */

const transports = []
class Logger {
  constructor () {
    if (config.logger.logInDatabase) {
        require('winston-mongodb') // eslint-disable-line 
      const db = config.db
      const connectionString = `mongodb://${db.user}:${db.pass}@${db.host}/${db.logs}?authSource=admin`
      transports.push(new winston.transports.MongoDB({
        db: connectionString,
        level: config.logger.level, // from configuration file
        storeHost: true,
        options: { useUnifiedTopology: true },
        collection: 'application',
        name: 'applicationslogs',
        tryReconnect: true,
        handleExceptions: true,
        uri_decode_auth: true
      }))
    }

    // Transport to store logs in file system. Every day new file will be created
    if (config.logger.logInFile) {
      const DailyRotateFile = require('winston-daily-rotate-file')
      transports.push(new DailyRotateFile({
        format: winston.format.json(),
        name: 'fileLogs',
        storeHost: true,
        level: config.logger.level,
        filename: path.join(__dirname, '../logs', 'application.log'),
        handleExceptions: true
      }))
    }
    // TNA-1026 : All : Error object (like TypeError) in error logs is not visible in mongodb and console.
    const enumerateErrorFormat = winston.format(info => {
      if (info.level === 'error' && info.metadata) {
        let err = info.metadata.err || info.metadata.error
        if (err instanceof Error) {
          info.metadata.err = Object.assign({
            message: err.message,
            stack: err.stack,
            code: err.code
          }, err)
        }
      }
      return info
    })

    // Transport to display logs on console
    if (config.logger.logOnConsole) {
      transports.push(new (winston.transports.Console)({
        format: winston.format.combine(
          enumerateErrorFormat(),
          winston.format.json()
        ),
        level: config.logger.level,
        handleExceptions: true
      }))
    }

    //  For older versions of winston, it requires key instead of metaKey
    this.logger = winston.createLogger({
      format: winston.format.metadata({ metaKey: 'meta' }),
      transports: transports
    })
    this.logger.exitOnError = false
    this.logger.info('LoggerService:constructor: Logger Initialized ')
  }
}

module.exports = new Logger().logger
