// Include Express
const express = require('express')
const app = express()
const port = 3000

// Include Handlebars
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/result', (req, res) => {
  res.render('result')
})

app.listen(port, () => {
  console.log(`URL shortener is running on http://localhost:${port}`)
})
