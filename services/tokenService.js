const jwt = require('jsonwebtoken')
const randomUtils = require('../utils/random')
const TokenModel = require('../repositories/models/tokenModel')

class TokenService {
/**
 * @function
 * @param  {Object} user
 * @returns {Object}
 * @description returns jwt generated token
 */
  async generateToken (user) {
    const secretKey = user.secretKey || randomUtils.generate()
    const token = jwt.sign({ userId: user._id, username: user.username }, secretKey)
    const tokens = new TokenModel({
      userId: user._id,
      token: token,
      key: secretKey
    })
    const result = await tokens.save()
    return result
  }

  /**
 * @function
 * @param  {String} token
 * @returns {Object}
 * @description returns decoded userId and username
 */
  async verifyToken (token) {
    if (!token) {
      throw new Error('error.tokenNotFound')
    }
    const tokenData = await TokenModel.find({ token: token })
    if (tokenData.length > 0) {
      const decoded = await jwt.verify(tokenData[0].token, tokenData[0].key)
      return decoded
    } else {
      throw new Error('error.invalidToken')
    }
  }

  /**
 * @param  {ObjectId} userId
 * @param  {String} token
 * @returns {String}
 * @description removes token from tokens collection
 */
  async removeToken (userId, token) {
    const query = { userId: userId }
    token ? query.token = token : void 0
    await TokenModel.deleteMany(query)
    return 'login.logOutSuccessful'
  }
}

module.exports = new TokenService()
