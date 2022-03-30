import { Component } from 'react'

export default class LoginButton extends Component {
  
  /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
  render() {
    return (
      <button onClick={this.props.onLogin}>
        Log in
      </button>
    );
  }

}
