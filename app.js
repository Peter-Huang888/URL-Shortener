// Include Express
const express = require('express')
const app = express()
const port = 3000

// Include Handlebars
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Include mongoose
const mongoose =require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on ('error', () => {
  console.log('mongoDB error!')
})
db.once ('open', () => {
  console.log('mongoDB connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/result', (req, res) => {
  res.render('result')
})

app.listen(port, () => {
  console.log(`URL shortener is running on http://localhost:${port}`)
})
