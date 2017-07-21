import PropTypes from 'prop-types';
import React from 'react';

export default class Book extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div>
        <span className="book">
          {`${this.props.title} - ${this.props.author} - ${this.props.year}`}
        </span>
      </div>
    );
  }
}
