// requiring dotenv moongose and express ...
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const methodOverride = require('method-override')
const path = require('path')

const app = express()

// connect to mongodb "database"
mongoose.connect(process.env.MONGODB_URI)
// check if it is conncected and confirm with a console log
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// when we expecting data from form
// after require we use it
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// connect to the controller
const animalCtrl = require('./controllers/animals')
app.use('/', animalCtrl)

// lisiting to port
// const PORT = 3000
app.listen(3000, () => {
  console.log('listning 3000')
})

// // css
app.use(express.static(path.join(__dirname, "public")));
