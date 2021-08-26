var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize')

// - Shows the full list of books 

router.get('/books', function(req, res, next) {
  res.render(`<h1>Router working 1</h1>`)
  console.log('im here');
});

//- Shows the create new book form
router.get('books/new', function (req, res) {
  //  res.render('new-book');
  res.send('Router working 2')
})

//- Posts a new book to the database
router.post('books/new', function (req, res) {
 
})

//- Shows book detail form
router.get('/books/:id', function (req, res) {
  res.send('Router working 3')
  // Book.findAll({ where: { id: req.params.id } }).then(books => res.json(books));
  // const project = projects[id];
  // res.render('project', {project})
 
})

// - - Updates book info in the database
router.post('/books/:id', function (req, res) {
  // let id = req.params.id;
  //update-book
})

//- Deletes a book. Careful, this can’t be undone. 
router.delete('/books/:id/delete', function (req, res) {
  // let id = req.params.id;

 
})











module.exports = router;


/*
get / - Home route should redirect to the /books route  --> DONE
get /books - Shows the full list of books -->  DOING


post /books/:id - Updates book info in the database
post /books/:id/delete - Deletes a book. Careful, this can’t be undone. 
       It can be helpful to create a new “test” book to test deleting
 

 // Book.findAll().then((data) => {
  //   res.json(data);
  // });

    // res.json(data);
  //  res.render('index', {books})


    (async () => {
    const dummyBook = await Book.create({ title: "As a man thinketh, so is he", author: "James Allen" });
  })();

       */

