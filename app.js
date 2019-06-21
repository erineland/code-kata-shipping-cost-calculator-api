var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var shipmentsRouter = require('./routes/shipments')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', function(req, res) {
	res.status(200).send({ status: 'OK' })
})

app.use('/shipments', shipmentsRouter)

module.exports = app;
