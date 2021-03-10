import React, {Component} from 'react';

class BookGrid extends Component {

render() {
  return (
        {
          this.props.bsWithShelfInfo.map((book) => (
            <li key={book.id} className='book-list-item'>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}>
              </div>
              <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(e) => this.props.onHandleBookSelect(book, e.target.value)}>
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
      );
};
};

export default BookGrid;
