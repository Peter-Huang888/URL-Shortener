const mongoose = require('mongoose')
const URL = require('../url')
const urls = ['https://www.google.com', 'https://tw.yahoo.com', 'https://www.facebook.com']
const shorten = ['wgQa8', 'sMWeu', 'BY5TM']

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected! Add seeds data')
  for (let i = 0; i < 3; i++) {
    URL.create({ url: `${urls[i]}`, shorten: `${shorten[i]}` })
  }
  console.log('done')
})

