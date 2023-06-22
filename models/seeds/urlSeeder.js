const db = require('../../config/mongoose')
const URL = require('../url')
const urls = ['https://www.google.com', 'https://tw.yahoo.com', 'https://www.facebook.com']

db.once('open', () => {
  console.log('Add seeds data')
  for (let i = 0; i < 3; i++) {
    const shortener = require('../../public/javascripts/shortener')
    const shorten = shortener()
    URL.create({ url: `${urls[i]}`, shorten: `${shorten}` })
  }
  console.log('done')
})

