import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import BookGrid from './BookGrid';
import {Link} from 'react-router-dom'

class Search extends Component {
  state = {
    query: '',
    searched_books: [],
    booksWithShelfInfo: []
  }

updateQuery = (query) => {
  this.setState( () => ({query: query}) );
  BooksAPI.search(query.trim()).then((results) => {
    if (results === undefined || results.error){
    this.setState(() => ({ searched_books: [] }));
  }
  else{
    this.setState(() => ({ searched_books: results }));
    this.updateShelfInfo();
  }
  });
};

clearQuery = () => {
  this.updateQuery('');
};

handleShelfSelect = (book, val) => {
  this.props.onHandleBookUpdate(book, val)
  this.updateShelfInfo();
};

updateShelfInfo = () => {
  const shelfInfo = this.state.searched_books.map((item) => {
    const selected_bookshelf = this.props.selected_books.find(elem => elem.id === item.id);
    let shelf = 'none';
    if (selected_bookshelf === undefined){
      shelf = 'none';
    }else{
      shelf = selected_bookshelf.shelf;
    }
    return {...item, shelf};
  });
  this.setState(() => ({booksWithShelfInfo: shelfInfo}));
}

render() {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className='close-search'
          to='/'>
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text"
                 placeholder="Search by title or author"
                 value={this.state.query}
                 onChange={(e) => this.updateQuery(e.target.value)}
                 />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <BookGrid booksWithShelfInfo={this.state.booksWithShelfInfo} onHandleShelfSelect={this.handleShelfSelect} />
         </ol>
      </div>
    </div>);
};
};

export default Search;
