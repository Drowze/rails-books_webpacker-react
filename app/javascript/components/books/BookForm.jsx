import PropTypes from 'prop-types';
import React from 'react';

export default class Book extends React.Component {
  static propTypes = {
    bookProperties: PropTypes.array.isRequired,
    submitBook: PropTypes.func.isRequired
  };

  render() {
    return (
      <form onSubmit={this.props.submitBook} >
        {
          this.props.bookProperties.map(property =>
            <input type="text" key={property} name={property} placeholder={property} />
          )
        }
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
