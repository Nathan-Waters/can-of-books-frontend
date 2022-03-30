import axios from 'axios';
import React from 'react';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      console.log(results);
      this.setState({
        books: results.data
      })
      console.log(this.state.books)
    } catch (error) {
      console.log("error: ", error)
    }
  }

  componentDidMount() {
    this.getBooks();
    console.log(this.state.books)
  };

  render() {
    /* TODO: render user's books in a Carousel */
    let bookItems = this.state.books ? this.state.books.map(book => {
      return (
        <Carousel.Item key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </Carousel.Item>
      )

    }) : <h3>These are not the Books you are looking for</h3>
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Carousel>
          {bookItems}
        </Carousel>
      </>
    )
  }
}
export default BestBooks;
