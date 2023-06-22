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
  const url = req.body.url
  if (!url) {
    return res.redirect('/')
  }
  return URL.find()
    .lean()
    .then(urls => {
      const filtered = urls.filter(item => item.url === url)
      if (filtered.length) {
        const shorten = filtered[0].shorten
        return res.render('result', { shorten })
      } else {
        const shorten = require('./shortener')
        URL.create({ url: url, shorten: shorten })
        return res.render('result', { shorten })
      }
    })
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`URL shortener is running on http://localhost:${port}`)
})
