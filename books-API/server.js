// DEPENDENCIES
const express = require('express')
const cros = require('cros')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cros())

app.get('/books/:id', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

// ROUTES
app.get('/', (req, res) => {
    res.send('books-API')
})

// Books 
const booksController = require('./controllers/books-controller')
app.use('/books', booksController)

app.get('*', (req, res) => {
    res.json(
        {
            errCode: '404',
            errMessage: 'invalid Input'
        }
    )
})

// LISTEN
app.listen(PORT, () => {
    console.log('Greetings! From port: ', PORT);
})