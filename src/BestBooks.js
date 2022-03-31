import axios from 'axios';
import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import EditModal from './EditModal';
// import DeleteModal from './DeleteModal';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      newBook: {},

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
  };


 


  // postBooks = async () => {
  //   try {
  //     let url = `${process.env.REACT_APP_SERVER}/books`;
  //     let createdBook = await axios.post(url, this.props.newBook);
  //     console.log(createdBook.data);
  //     this.setState({
  //       books: [...this.state.books, createdBook.data]
  //     })
  //   } catch (error) {
  //     console.log('we have an error: ', error.response.data);
  //   }
  // }

  deleteBooks = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data);
    }
  }


  

  // deleteBooks = async (id) => {
  //   try {
  //     let url = `${process.env.REACT_APP_SERVER}/books/${id}`
  //     let updatedBooks = await axios.delete(url);
  //     this.state.books.filter(book => book._id !== id);
  //     this.setState({
  //       books: updatedBooks
  //     })
  //   } catch (error) {
  //     console.log('we have an error: ', error.response.data);
  //   }
  // }


  updateBook = async (bookToUpdate) => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`
      let updatedBooks = await axios.map(url,bookToUpdate);
      let updatedBooksData = this.state.books.map(existingBook =>{
        return existingBook._id === bookToUpdate._id ? updatedBooks.data : existingBook;
      });
      this.setState({
        books: updatedBooksData
      });
    }catch(error){
      console.log('we have an error: ', error.message)
    }
  }

  sendMeTheBooks = (book) => {
    this.props.openEditModal();
    let books = book;
    console.log(books);
  }

 

  render() {
    /* TODO: render user's books in a Carousel */
    let bookItems = this.state.books ? this.state.books.map(book => {
      return (
        <Carousel.Item key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <Button onClick={()=>this.deleteBooks(book._id)}>DELETE MEEEE!</Button>

          <Button onClick={()=>this.sendMeTheBooks(book)}>EDIT MEEEE!</Button>
        </Carousel.Item>
      )

    }) : <h3>These are not the Books you are looking for</h3>
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Carousel>
          {bookItems}
        </Carousel>
        
        <Button onClick={this.props.openModal}>Add new Book</Button>
        <EditModal
          showEditModal={this.props.showEditModal}
          hideModal={this.props.hideModal}
          updateBook={this.updateBook} 
          // books={this.state.books} 
        />
      </>
    )
  }
}
export default BestBooks;
