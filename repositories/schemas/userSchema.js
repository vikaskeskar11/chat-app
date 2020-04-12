const Schema = require('mongoose').Schema

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
}
)

module.exports = userSchema
