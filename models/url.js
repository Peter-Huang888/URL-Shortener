const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = {
  url: {
    type: String,
    required: true
  }
}

module.exports = mongoose.model("URL", urlSchema)