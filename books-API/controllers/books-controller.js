const router = require('express').Router()
const Book = require('../models/bookModel.js')

// Seed:
router.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})



// Show:
router.get('/:id', (req, res) => {
    Book.findById(req.parms.id)
        .then(foundBook => {
            res.json(foundBook)
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Bad Request')
            res.json(
                {
                    errCode: '404',
                    errMessage: 'invalid Input'
                }
            )
        })
})

// edit
router.put('/books/:id', (req , res) =>{
    Book.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedBook)=>{
        res.json(updatedBook)
    })
    .catch(err => {
        console.log(err)
        res.status(400).send('Bad Request')
        res.json(
            {
                errCode: '404',
                errMessage: 'invalid Input'
            }
        )
    })
})

// Index:
router.get('/', (req, res) => {
    Book.find()
        .then(foundBooks => {
            res.json(foundBooks)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(
                {
                    errMessage: 'Invalid Request'
                }
            )
        })
})


// new
router.post('/books', (req, res)=>{
    Book.create(req.body)
    .then((createdBook)=>{
        res.json(createdBook)
        req.redirect('/books')
    })
    .catch(err => {
        console.log(err)
        res.status(400).send('Bad Request')
        res.json(
            {
                errCode: '404',
                errMessage: 'invalid Input'
            }
        )
    })
})

// delete

router.delete('/books/:id', (req,res)=>{
    Book.findByIdAndDelete(req.params.id)
    .then(book=>{
        req.redirect('/books')
    })
    .catch(err => {
        console.log(err)
        res.status(400).send('Bad Request')
        res.json(
            {
                errCode: '404',
                errMessage: 'invalid Input'
            }
        )
    })
})

module.exports = router