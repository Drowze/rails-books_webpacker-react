import PropTypes from 'prop-types';
import React from 'react';
import BookForm from './BookForm';
import Book from './Book';
import $ from 'jquery';

export default class Books extends React.Component {
  static propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      })
    ).isRequired
  };

  constructor(props) {
    super(props);
    this.state = { books: this.props.books }
  }

  submitBook(e) {
    e.preventDefault();

    $.post({
      url: `/books`,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        "book": {
          "title": e.target.title.value,
          "author": e.target.author.value,
          "year": e.target.year.value
        }
      })
    })
    .then(book => this.setState({books: this.state.books.concat(book)}))
    .catch(error => console.log(error))

    e.target.reset();
  }

  render() {
    let books = this.state.books;
    let bookProperties = ['author', 'title', 'year']
    return (
      <div className="books-container">
        {books.map(book =>
          <Book
            key={book.title}
            title={book.title}
            author={book.author}
            year={book.year}
          />
        )}
        <BookForm bookProperties={bookProperties} submitBook={this.submitBook.bind(this)} />
      </div>
    );
  }
}
