import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      user: null
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

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} onLogin={this.loginHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            <BestBooks/>


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
        
      </>
    )
  }
}

export default App;
