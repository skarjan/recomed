import { useEffect, useState } from "react";
import bookService from "./services/bookService";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="btn navbar-brand">AVIT</button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="btn nav-link" href="https://www.avdveen.nl/">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>This app can recommend you a new book to read</p>
    </>
  );
};

const List = ({ genreValue, bookList }) => {
  if (bookList.length === 0) {
    return null;
  }
  return (
    <div className="col-4">
      <h2>Why not read:</h2>
      <ol>
        {bookList.map((book) => (
          <li key={book.rank}>
            {book.title
              .split(" ")
              .map(
                (word) =>
                  word[0].toUpperCase() + word.substring(1).toLowerCase()
              )
              .join(" ")}
          </li>
        ))}
      </ol>
    </div>
  );
};
function App() {
  const [bookLists, setBookLists] = useState([]);
  const [genre, setGenre] = useState("");
  const [genreBookList, setGenreBookList] = useState([]);

  useEffect(() => {
    bookService.getList().then((list) => {
      setBookLists(list);
      setGenre("default");
    });
  }, []);

  const handleClick = (event) => {
    if (genre !== "default") {
      bookService.getCurrentList(genre).then((list) => {
        setGenreBookList(list.results.books);
      });
    }
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="row">
        <div className="col-4">
          <Header />
          <img src="reading.jpg" alt="" />
          <label htmlFor="listSelect">Choose your genre:</label>
          <select
            id="listSelect"
            className="form-select mb-1"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="default">Choose genre</option>
            {bookLists.map((list) => (
              <option
                key={list.list_name_encoded}
                value={list.list_name_encoded}
              >
                {list.display_name}
              </option>
            ))}
          </select>
          <div className="d-grid gap-2">
            <button className="btn btn-block btn-dark" onClick={handleClick}>
              Recommend
            </button>
          </div>
        </div>
        <List genreValue={genre} bookList={genreBookList} />
      </div>
      <div className="row">
        <div className="col-12">
          <em>Data provided by https://api.nytimes.com</em>
        </div>
      </div>
    </div>
  );
}

export default App;
