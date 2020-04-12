/**
 * Generate password form allowed word
 */
const merge = require('utils-merge')
const digits = '0123456789'
const alphabets = 'abcdefghijklmnopqrstuvwxyz'
const upperCase = alphabets.toUpperCase()
const specialChars = '#!&@'
const defaultOptions = { digits: true, alphabets: true, upperCase: true, specialChars: true }

class PasswordGenerator {
  /**
   * @function
   * @name generate
   * @param {Number} length
   * @param {Object} options
   */
  generate (length, options) {
    length = length || 10
    options = merge(defaultOptions, options)
    const allowsChars = ((options.digits || '') && digits) +
      ((options.alphabets || '') && alphabets) +
      ((options.upperCase || '') && upperCase) +
      ((options.specialChars || '') && specialChars)
    let password = ''
    for (let index = 0; index < length; ++index) {
      const charIndex = this.rand(1, allowsChars.length)
      password += allowsChars[charIndex]
    }
    return password
  }
  /**
   * @param  {Number} min
   * @param  {Number} max
   * @returns {Number}
   * @description Random number between provided min and max
   */
  rand (min, max) {
    const random = Math.random()
    return Math.floor(random * (max - min) + min)
  }
}

module.exports = new PasswordGenerator()
