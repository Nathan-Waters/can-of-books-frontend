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
import Profile from './Profile';
import LoginForm from './LoginForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showModal: false,
      newBook: {}
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

  hideModal = () => {
    this.setState({
      showModal:false
    })
  }

  bookHandler = (createdBook) =>{
    this.setState({
      newBook: createdBook
    })
    console.log(createdBook);
  }

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} onLogin={this.loginHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            <BestBooks
            showModal={this.state.showModal}
            openModal={this.openModal}
            newBook={this.state.newBook}
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
        <BookModal hideModal={this.hideModal} 
        showModal={this.state.showModal}
        user={this.state.user}
        bookHandler={this.bookHandler}
        />
      </>
    )
  }
}

export default App;
