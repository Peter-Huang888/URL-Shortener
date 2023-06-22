const express = require('express')
const router = express.Router()
const URL = require('../models/url')

router.get('/', (req, res) => {
  res.render('index')
})
router.post('/result', (req, res) => {
  const url = req.body.url.trim('')
  // if the user does not enter something, a prompt is given
  if (!url) {
    const tr = true
    return res.render('index', { tr })
  }
  return URL.find()
    .lean()
    .then(webs => {
      const filtered = webs.filter(web => web.url === url)
      // If the same URL is entered, the same shorten address is generated
      if (filtered.length) {
        const shorten = filtered[0].shorten
        return res.render('result', { shorten })
        // If the different URL is entered, create a new shorten address
      } else {
        const shortener = require('../public/javascripts/shortener')
        const shorten = shortener()
        URL.create({ url: url, shorten: shorten })
        return res.render('result', { shorten })
      }
    })
    .catch(err => console.log(err))
})

router.get('/:shortener', (req, res) => {
  const shortener = req.params.shortener
  // 透過shortener從資料庫撈資料後，再導向原本的url
  return URL.findOne({ shorten: shortener })
    .lean()
    .then(web => res.redirect(`${web.url}`))
})

module.exports = router