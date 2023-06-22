// Include Express
const express = require('express')
const app = express()
const port = 3000

// Include Handlebars
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Include mongoose
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})
const URL = require('./models/url')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/result', (req, res) => {
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
        const shortener = require('./shortener')
        const shorten = shortener()
        URL.create({ url: url, shorten: shorten })
        return res.render('result', { shorten })
      }
    })
    .catch(err => console.log(err))
})

app.get('/:shortener', (req, res) => {
  const shortener = req.params.shortener
  return URL.findOne({ shorten: shortener })
    .lean()
    .then(web => res.redirect(`${web.url}`))
})

app.listen(port, () => {
  console.log(`URL shortener is running on http://localhost:${port}`)
})
