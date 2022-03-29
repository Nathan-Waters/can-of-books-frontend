import axios from 'axios';
import React from 'react';
import {Carousel,Container} from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try{
      let bookResults = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: bookResults.data
      })
      console.log(bookResults);
    }catch(error){
      console.log('Error has occurred', error.response.data)
    }
  }

  componentDidMount(){
    this.getBooks();
  };

 

  render() {
    console.log(this.state.books);

    let renderedBooks = this.state.books.map((e) => {
        <Carousel>
          <Carousel.item key={e._id}>
            <h2>{e.title}</h2>
            <p>{e.description}</p>
          </Carousel.item>
        </Carousel>
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Container>
            <Carousel>
              {renderedBooks}
            </Carousel>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
