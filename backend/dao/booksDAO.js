import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let books;

export default class BooksDAO {
  static async injectDB(conn) {
    if (books) {
      return;
    }
    try {
      //getting books collection
      books = await conn.db(process.env.MONGODB_NS).collection("books");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in booksDAO: ${e}`
      );
    }
  }

  static async getBooks({
    filters = null, //can pass in a filter
    page = 0,
    booksPerPage = 20,
  } = {}) {
    let query = {};
    if (filters) {
      if (filters["title"] !== "") {
        query["title"] = { $eq: filters["title"] };
      }
      if (filters["author"] !== "") {
        query["author"] = { $eq: filters["author"] };
      }
      if (filters["genre"] !== "") {
        query["genre"] = { $eq: filters["genre"] };
      }
    }

    let cursor;

    try {
      cursor = await books.find(query); //finds the query in restaurants, if this is blank it just returns all restaurants
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { booksList: [], totalBooks: 0 };
    }

    const displayCursor = cursor
      .limit(booksPerPage)
      .skip(booksPerPage * page); //limit the results, skip to get to page number

    try {
      const booksList = await displayCursor.toArray();
      const totalBooks = await books.countDocuments(query); //counts num of docs

      return { booksList, totalBooks };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { booksList: [], totalBooks: 0 };
    }
  }

  static async addBook(title, author, genre) {
    try {
      const bookDoc = {
        title: title,
        author: author,
        genre: genre,
      };
      //   book_id: ObjectId(restaurantId), } //converts string to mongodb objectid

      return await books.insertOne(bookDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
}
