import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookModal from './BookModal';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks';
// import EditModal from './EditModal';
import Profile from './Profile';
import LoginForm from './LoginForm';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showModal: false,
      showEditModal: false
      // newBook: {}
    }
  }

  loginHandler = (user) => {
    this.setState({
      user: user
    })
    console.log(this.state.user);
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  openModal = () => {
    this.setState({
      showModal:true
    })
  }

  openEditModal = () => {
    this.setState({
      showEditModal:true
    })
  }


  hideModal = () => {
    this.setState({
      showModal:false,
      showDeleteModal: false
    })
  }

  // bookHandler = (createdBook) =>{
  //   this.setState({
  //     newBook: createdBook
  //   })
  //   console.log(createdBook);
  // }

  postBooks = async (newBook) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBook = await axios.post(url, newBook);
      console.log(createdBook);
      this.setState({
        books: [...this.state.books, createdBook.data]
      })
    } catch (error) {
      console.log('we have an error: ', error);
    }
  }


  render() {
    console.log(this.state)
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} onLogin={this.loginHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            <BestBooks
            // postBooks={this.postBooks} 
            // showModal={this.state.showModal}
            openModal={this.openModal}
            postBooks={this.postBooks}
            openEditModal={this.openEditModal}
            // showDeleteModal={this.state.showDeleteModal}
            // newBook={this.state.newBook}
            showEditModal={this.state.showEditModal}
            hideModal={this.hideModal}  
            />


            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route exact path="/Profile">
            <Profile 
              user={this.state.user}
            />
            </Route>

            <Route exact path="/LoginForm">
              <LoginForm onLogin={this.loginHandler}></LoginForm>
            </Route>
          </Switch>
          <Footer />
    
        </Router>
        <BookModal
        postBooks={this.postBooks} 
        hideModal={this.hideModal} 
        showModal={this.state.showModal}
        user={this.state.user}
        bookHandler={this.bookHandler}
        />
        {/* <EditModal
        showEditModal={this.state.showEditModal} 
        hideModal={this.hideModal} 
        /> */}
      </>
    )
  }
}

export default App;
