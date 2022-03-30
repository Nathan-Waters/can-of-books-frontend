import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {

  submitHandler = (e) => {
    e.preventDefault();
    let newUser = {
      username: e.target.username.value,
      email: e.target.email.value
    }
    console.log(newUser);
    this.setState({
      user : newUser
    })
    this.props.onLogin(newUser);
    console.log(this.props.user);
  }

  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <>
      <Form onSubmit={this.submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="type" placeholder="Pick something human like..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Human like email..." />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </>
    );
  }
};

export default LoginForm;
