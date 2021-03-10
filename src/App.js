import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookGrid from './BookGrid'
import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
     all_books: []
  }

  toggleVar = () => {
    this.setState(() => ({
      showSearchPage: false
    }));
  };

  handleBookUpdate = (book, val) => {
    BooksAPI.update(book, val)
    BooksAPI.getAll()
    .then((books)=> {
      this.setState(() => ({
        all_books: books
      }))
    })
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books)=> {
      this.setState(() => ({
        all_books: books
      }))
    })
  }
  render() {
    const read_books = this.state.all_books.filter((book) => book.shelf === 'read');
    const currently_reading_books = this.state.all_books.filter((book) => book.shelf === 'currentlyReading');
    const want_to_read_books = this.state.all_books.filter((book) => book.shelf === 'wantToRead');
    return (
      <div className="app">
        <Route exact path='/' render={() =>
        (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <BookGrid booksWithShelfInfo={currently_reading_books} onHandleShelfSelect={this.handleBookUpdate} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <BookGrid booksWithShelfInfo={want_to_read_books} onHandleShelfSelect={this.handleBookUpdate} />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <BookGrid booksWithShelfInfo={read_books} onHandleShelfSelect={this.handleBookUpdate} />
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
                className='add-a-book'>
              <button>Add a book</button>
              </Link>
            </div>
          </div>
        )} />
          <Route path='/search' render={({history}) => ( <Search selected_books={this.state.all_books} onHandleBookUpdate={(book, val) => {
            this.handleBookUpdate(book, val);
             } } />
          )} />
          {//<Search onToggleVar={this.toggleVar} selected_books={this.state.all_books} onHandleBookUpdate={this.handleBookUpdate} />
          }
      </div>
    )
  }
}

export default BooksApp
