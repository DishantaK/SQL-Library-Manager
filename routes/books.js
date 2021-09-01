var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize'); 
// - Shows the full list of books 

router.get('/', async function(req, res) {
  const books =  await Book.findAll();
  res.render('index', { books });
});

//- Shows the create new book form

router.get("/new", function(req, res) {
  res.render('new-book')
});

//- Posts a new book to the database

router.post('/new', async function (req, res) {
  try {
  await Book.create(req.body);
  res.redirect("/books");
  } catch (error) {
    error.errors.map(e => console.log(e.message))
    let book = await Book.build(req.body);
    res.render("new-book", { book, errors: error.errors, title: "New Book" })
    // res.render('new-book')
  }
  
})

//- Shows book detail form

router.get('/:id', async function (req, res) {
  const book = await Book.findByPk(req.params.id);
  res.render("update-book", { book });
  
  if(book == null) {
    res.status(404).render('page-not-found.pug');
  } 
  
})

// - Updates book info in the database
router.post('/:id',  async function (req, res) {
try {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.update(req.body);
    res.redirect("/"); 
  } 
} catch (error){
    error.errors.map(e => console.log(e.message))
    let book = await Book.build(req.body);
    res.render("update-book", { book, errors: error.errors, title: "Update Book" })
    // res.render('new-book')
  
}
})

//- Deletes a book. Careful, this can’t be undone. 
router.post('/:id/delete', async function (req, res) {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/");
})


router.get('*', async function(req, res) {
  res.status(404).render('page-not-found.pug');
});

module.exports = router;