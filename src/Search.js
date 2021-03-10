import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookGrid from './BookGrid';

class Search extends Component {
  state = {
    query: '',
    searched_books: [],
    get_all_books: [],
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
    BooksAPI.getAll()
    .then((books)=> {
      this.setState(() => ({
        get_all_books: books
      }))
    })

    const shelfInfo = this.state.searched_books.map((item) => {
      const selected_bookshelf = this.state.get_all_books.find(elem => elem.id === item.id);
      let shelf = 'none';
      if (selected_bookshelf === undefined){
        shelf = 'none';
      }else{
        shelf = selected_bookshelf.shelf;
      }
      return {...item, shelf};
    });

    this.setState(() => ({booksWithShelfInfo: shelfInfo}));

    //  this.state.searched_books.forEach((item, i) => {
    //  item ['shelf'] = 'none';
    //  let active_book_match = this.state.get_all_books.filter((b) => {return b.id === item.id});
    //  console.log('hi', active_book_match);
    //  if (!active_book_match)
    //  {
    //    item ['shelf'] = active_book_match.shelf;
    //  }
    //});

    //this.setState((oldState) => ({ searched_books: [...oldState.searched_books] }));
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
          <input type="text"
                 placeholder="Search by title or author"
                 value={this.state.query}
                 onChange={(e) => this.updateQuery(e.target.value)}
                 />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <BookGrid bsWithShelfInfo={this.state.booksWithShelfInfo} onHandleBookSelect={this.handleBookSelect}/>
        // {
        //   this.state.booksWithShelfInfo.map((book) => (
        //     <li key={book.id} className='book-list-item'>
        //     <div className="book">
        //       <div className="book-top">
        //         <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}>
        //       </div>
        //       <div className="book-shelf-changer">
        //         <select value={book.shelf} onChange={(e) => this.handleBookSelect(book, e.target.value)}>
        //           <option value="move" disabled>Move to...</option>
        //           <option value="currentlyReading">Currently Reading</option>
        //           <option value="wantToRead">Want to Read</option>
        //           <option value="read">Read</option>
        //           <option value="none">None</option>
        //         </select>
        //       </div>
        //       </div>
        //       <div className="book-title">{book.title}</div>
        //       <div className="book-authors">{book.authors && book.authors.map((auth) => <p>{auth}</p>)}</div>
        //     </div>
        //   </li>
        // ))}
         </ol>
      </div>
    </div>);
};
};

export default Search;
