import { Link } from "react-router-dom";
import classes from "./addbook.module.css";
import { useState } from "react";
import BookDataService from "../services/books";

const AddBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

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
    let data = {
      title: title,
      author: author,
      genre: genre,
    };
    console.log(data)
    BookDataService.createBook(data)
      .then((response) => {
        setTitle("");
        setAuthor("");
        setGenre("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <main className={classes.centering}>
      <div>
        <header className={classes.heading}>
          <h1>Add a Book</h1>
        </header>
        <section className={classes.small}>
          <form>
            <div className={classes.title}>
              <label htmlFor="title">Title: </label>
              <input id="title" type="text" onChange={titleChangeHandler} value={title} required/>
            </div>
            <div className={classes.author}>
              <label htmlFor="author">Author: </label>
              <input id="author" type="text" onChange={authorChangeHandler} value={author} required/>
            </div>
            <div className={classes.genre}>
              <label htmlFor="genre">Genre: </label>
              <input id="genre" type="text" onChange={genreChangeHandler} value={genre} required/>
            </div>
            <button onClick={submitHandler}>Add Book</button>
          </form>
          <Link to="/">Back to Home</Link>
        </section>
      </div>
    </main>
  );
};

export default AddBook;
