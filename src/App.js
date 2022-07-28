import './App.css';
import { useEffect, useState } from 'react';
import bookService from './services/bookService';

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
          aria-label="Toggle navigation">
          <span
            className="navbar-toggler-icon">

          </span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="btn nav-link" href="https://www.avdveen.nl/">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const Header = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h2>Welcome</h2>
        <p>This app can recommend you a new book to read</p>
      </div>
    </div>
  )
}

function App() {
  const [bookLists, setBookLists] = useState([])
  const [genre, setGenre] = useState("")
  const [genreBookList, setGenreBookList] = useState([])
  useEffect(() => {
    bookService.getList().then((list) => {
      setBookLists(list)
    })
  }, [])

  const handleClick = (event) => {
    bookService.getCurrentList(genre).then((list) => {
      setGenreBookList(list.results.books)
    })
  }

  const handleGenreChange = (event) => {
    console.log(event.target.value)
    setGenre(event.target.value)
  }
  console.log(genreBookList.title)
  return (
    <div className="container">
      <Navbar />
      <Header />
      <div className="row">
        <div className="col-4">
          <label htmlFor="listSeelct">Choose your genre:</label>
          <select id='listSelect' className='form-select mb-1' value={genre} onChange={handleGenreChange}>
            {bookLists.map(list => (
              <option
                key={list.list_name_encoded}
                value={list.list_name_encoded}>
                {list.display_name}
              </option>
            )
            )}
          </select>
          <div className="d-grid gap-2">
            <button
              className='btn btn-block btn-dark'
              onClick={handleClick}>Recommend</button>
          </div>
          <ul>
            {genreBookList.map(book => (
              <li key={book.rank}>{book.title}</li> 
            )
            )}
          </ul>
        </div>
      </div>

    </div>
  );
}


export default App;
