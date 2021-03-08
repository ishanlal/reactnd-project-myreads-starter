import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

class Search extends Component {
  state = {
    query: '',
    searched_books: [],
    get_all_books: []
  }

updateQuery = (query) => {
  this.setState( () => ({query: query}) );
  BooksAPI.search(query.trim()).then((results) => {
    if (results === undefined || results.error){
    this.setState(() => ({ searched_books: [] }));
  }
  else{
    this.setState(() => ({ searched_books: results }));
    BooksAPI.getAll()
    .then((books)=> {
      this.setState(() => ({
        get_all_books: books
      }))
    })
  }
  });
};

clearQuery = () => {
  this.updateQuery('');
};

handleBookSelect = (book, val) => {
    BooksAPI.update(book, val);
    console.log('option changed');
    BooksAPI.getAll()
    .then((books)=> {
      this.setState(() => ({
        get_all_books: books
      }))
    })
};

render() {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => this.props.onToggleVar()}>Close</button>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text"
                 placeholder="Search by title or author"
                 value={this.state.query}
                 onChange={(e) => this.updateQuery(e.target.value)}
                 />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {
          this.state.searched_books.map((book) => (
            <li key={book.id} className='book-list-item'>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}>
              </div>
              <div className="book-shelf-changer">
              {//this.state.get_all_books.filter((b) => { return b.id === book.id })
              }
                <select value={(this.state.get_all_books.filter((b) => { return b.id === book.id })) ? (this.state.get_all_books.filter((b) => { return b.id === book.id })).shelf : ('none')} onChange={(e) => this.handleBookSelect(book, e.target.value)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors && book.authors.map((auth) => <p>{auth}</p>)}</div>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </div>);
};
};

export default Search;
