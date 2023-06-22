// Include Express
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')

// Include Handlebars
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Include mongoose
require('./config/mongoose')

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(router)

app.listen(port, () => {
  console.log(`URL shortener is running on http://localhost:${port}`)
})
