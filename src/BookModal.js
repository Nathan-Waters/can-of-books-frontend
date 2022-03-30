import React, { Component } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';

export default class BookModal extends Component {



  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      email: this.props.user.email,

    }
    console.log(newBook);
    this.props.bookHandler(newBook);
  }

  render() {

    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.hideModal}>

          <Modal.Body>
            <Form onSubmit={this.handleBookSubmit}>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Name of Book..." />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="Brief Description of Book..." />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Check type="checkbox" label="Status" />
              </Form.Group>
            <Button variant="primary" type="submit ">Submit</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModal}>Close</Button>
        </Modal>
      </>
    )
  }
}
