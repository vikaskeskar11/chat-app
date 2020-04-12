const tokenService = require('../services/tokenService')
const logger = require('../logger/logger')
const nonSecurePath = ['/login']
class AuthMiddleware {
  async verify (req, res, next) {
    if (nonSecurePath.includes(req.path)) {
      next()
    } else {
      try {
        const token = req.headers.token || ''
        const userInfo = await tokenService.verifyToken(token)
        req.user = userInfo
        next()
      } catch (error) {
        logger.error('authMiddleware ', { hostname: req.hostname, path: req.path, error: error })
        res.status(401).send({ error: error.message })
      }
    }
  }
}

module.exports = new AuthMiddleware().verify
