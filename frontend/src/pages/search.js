import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BookDataService from "../services/books";
import classes from "./search.module.css";

const Search = (props) => {
  let [searchParams, setSearchParams] = useSearchParams()

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState(searchParams.get('title'));
  const [author, setAuthor] = useState(searchParams.get('author'));
  const [genre, setGenre] = useState(searchParams.get('genre'));

  const retrieveBooks = () => {
    BookDataService.getAll(title, author, genre, 0)
      .then((response) => {
        console.log(response.data);
        setBooks(response.data.books);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveBooks();
  }, []);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const authorChangeHandler = (event) => {
    setAuthor(event.target.value);
  };

  const genreChangeHandler = (event) => {
    setGenre(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let params = {title: title, author: author, genre: genre}
    setSearchParams(params)
    retrieveBooks();
  };

  return (
    <main className={classes.centering}>
      <div>
        <header className={classes.heading}>
          <h1>Search</h1>
        </header>
        <section className={classes.small}>
          <form>
            <div className={classes.title}>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                type="text"
                onChange={titleChangeHandler}
                value={title}
              />
            </div>
            <div className={classes.author}>
              <label htmlFor="author">Author: </label>
              <input
                id="author"
                type="text"
                onChange={authorChangeHandler}
                value={author}
              />
            </div>
            <div className={classes.genre}>
              <label htmlFor="genre">Genre: </label>
              <input
                id="genre"
                type="text"
                onChange={genreChangeHandler}
                value={genre}
              />
            </div>
            <button onClick={submitHandler}>Search</button>
          </form>
          <Link to="/">Back to Home</Link>
        </section>
      </div>
      <div className={classes.tableContent}>
        <table>
          <thead>
            <tr className={classes.header}>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className={classes.entry}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Search;
