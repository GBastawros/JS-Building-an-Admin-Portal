// require mongoose:
require('dotenv').config() 
const mongoose = require('mongoose') 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  
// schema:
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    year: Number,
    quantity: Number,
    imageURL: String
})

// model and export: 
const Book = mongoose.model('Book', bookSchema)
module.exports = Book