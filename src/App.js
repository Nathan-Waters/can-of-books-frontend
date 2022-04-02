import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
// import BookModal from './BookModal';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks';
import BookModal from './BookModal';
import ProfileAuth0 from './Profile';
import LoginForm from './LoginForm';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react'
import LoginButtonauth0 from './authLoginButton';
import LogoutButtonauth0 from './authLogoutButton';

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
      showModal: true
    })
  }

  openEditModal = () => {
    this.setState({
      showEditModal: true
    })
  }


  hideModal = () => {
    this.setState({
      showModal: false,
      showDeleteModal: false
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    let newUser = {
      username: e.target.username.value,
      email: e.target.email.value
    }
    console.log(newUser);
    this.setState({
      user: newUser
    })
    this.loginHandler(newUser);
    console.log(this.props.user);
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
        <h1>Auth0</h1>
        {
          this.props.auth0.isAuthenticated
            ? <LogoutButtonauth0 />
            : <LoginButtonauth0 />
        }
        {
          this.props.auth0.isAuthenticated
            ? <Router>
              <Header user={this.state.user} onLogout={this.logoutHandler} onLogin={this.loginHandler} />
              <Switch>
                <Route exact path="/">
                  {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                  <BestBooks
                    openModal={this.openModal}
                    postBooks={this.postBooks}
                    openEditModal={this.openEditModal}
                    showEditModal={this.state.showEditModal}
                    hideModal={this.hideModal}
                  />
                 <BookModal
                    postBooks={this.postBooks}
                    hideModal={this.hideModal}
                    showModal={this.state.showModal}
                    user={this.state.user}
                    bookHandler={this.bookHandler}
                  />
                </Route>
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                <Route exact path="/Profile">
                  <ProfileAuth0
                  />
                </Route>

                <Route exact path="/LoginForm">
                  <LoginForm submitHandler={this.submitHandler} onLogin={this.loginHandler}></LoginForm>
                </Route>
              </Switch>
              <Footer />

              </Router>

            : <h2>Please Log In</h2>
        }
      </>
    )
  }
}


export default withAuth0(App);
