class GeneralUtils {
/**
 * @function
 * @name omitProperties
 * @param {Object} object
 * @param {Array} property
 */
  omitProperties (object, properties) {
    for (const property of properties) {
      if (object && object.hasOwnProperty(property)) {
        delete object[property]
      }
    }
    return object
  }
}

module.exports = new GeneralUtils()
