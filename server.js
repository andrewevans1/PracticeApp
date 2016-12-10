const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const practiceApp = require('./app')
const bodyParser = require('body-parser')
const morgan = require('morgan')

//set vieww engine to handlebars
app.use(express.static('public'))
app.set('view engine', 'hbs')

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//http request logging
app.use(morgan('combined'))

//include session middleware
app.use(practiceApp.session)

//Register routes
app.use('/', practiceApp.router)

//404 for unregistered routes
app.use((req, res, next) => {
  res.status(404).render('404')
})

//ioServer, listen on port port
practiceApp.ioServer(app).listen(port, ()=>{
	console.log("started app on port ", port)
})