import BooksDAO from "../dao/booksDAO.js";

export default class BooksController {
  static async apiGetBooks(req, res, next) {
    const booksPerPage = req.query.booksPerPage
      ? parseInt(req.query.booksPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {};
    filters.title = req.query.title;
    filters.author = req.query.author;
    filters.genre = req.query.genre;
    // if (req.query.cuisine) {
    //   filters.cuisine = req.query.cuisine
    // } else if (req.query.zipcode) {
    //   filters.zipcode = req.query.zipcode
    // } else if (req.query.name) {
    //   filters.name = req.query.name
    // }

    const { booksList, totalBooks } = await BooksDAO.getBooks({
      filters,
      page,
      booksPerPage,
    });

    let response = {
      books: booksList,
      page: page,
      filters: filters,
      entries_per_page: booksPerPage,
      total_results: totalBooks,
    };
    res.json(response);
  }
  static async apiPostBook(req, res, next) {
    try {
      const title = req.body.title;
      const author = req.body.author;
      const genre = req.body.genre;

      const Book = await BooksDAO.addBook(title, author, genre);
      res.status(201).json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
