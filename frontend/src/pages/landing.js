import { Link } from 'react-router-dom';
import classes from "./landing.module.css";

const Landing = (props) => {
  return (
    <main className={classes.centering}>
      <div>
        <header className={classes.heading}>
          <h1>BookFinder</h1>
        </header>
        <section className={classes.small}>
          <Link to="/search">Search</Link>
          <Link to="/addbook">Add a Book</Link>
        </section>
      </div>
    </main>
  );
};

export default Landing;


{/* <div className={classes.searchBy}>
            <p>Search By:</p>
            <div className={classes.buttons}>
              <button>Author</button>
              <button>Book</button>
              <button>Genre</button>
            </div>
          </div>
          <div className={classes.insert}>
            <p>Or:</p>
            <button>Add a Book</button>
          </div> */}