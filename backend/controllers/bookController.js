const Book = require('../models/Book');
const { success, error } = require('../utils/response');

/**
 * @desc   Get all books
 * @route  GET /api/books
 */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    success(res, books);
  } catch (err) {
    error(res, 'Failed to get books');
  }
};

/**
 * @desc   Get a book by ID
 * @route  GET /api/books/:id
 */
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return error(res, 'Book not found', 404);
    success(res, book);
  } catch (err) {
    error(res, 'Error fetching book');
  }
};

/**
 * @desc   Add a new book
 * @route  POST /api/books
 */
exports.addBook = async (req, res) => {
  try {
    const { title, author, description, genre, coverImage } = req.body;

    // Manual validation
    if (!title || !author ) {
      return error(res, 'Title, author are required', 400);
    }

    const newBook = new Book({ title, author, description, genre, coverImage });
    const savedBook = await newBook.save();
    success(res, savedBook, 201);
  } catch (err) {
    error(res, 'Invalid book data');
  }
};
