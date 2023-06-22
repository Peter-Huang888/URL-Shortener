const db = require('../../config/mongoose')
const URL = require('../url')
const urls = ['https://www.google.com', 'https://tw.yahoo.com', 'https://www.facebook.com']
const shorten = ['wgQa8', 'sMWeu', 'BY5TM']

db.once('open', () => {
  console.log('Add seeds data')
  for (let i = 0; i < 3; i++) {
    URL.create({ url: `${urls[i]}`, shorten: `${shorten[i]}` })
  }
  console.log('done')
})

