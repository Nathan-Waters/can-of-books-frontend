import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap'

class EditModal extends React.Component {
  
  
  handleUpdate = (e) => {
    e.preventDefault();
    let bookToUpdate = {
      title: e.target.title.value || this.props.books.title,
      description: e.target.description.value || this.props.books.description, email: e.target.email.value || this.props.books.email,
      status: e.target.status.checked,
      _id: this.props.books._id,
      __v: this.props.books.__v,
    }
    this.props.hideModal();
    console.log(bookToUpdate);
    // this.props.updateBook(bookToUpdate); 
  } 
  
    render() {

    return (
      <>
      {console.log(this.props.books)}
      {console.log(this.props.book)}
        <Modal show={this.props.showEditModal} onHide={this.props.hideModal}>
          <Modal.Body>
            <Form onSubmit={this.handleUpdate}>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Username</Form.Label>
                <Form.Control type="type" placeholder={this.props.books}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Human like email..." />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Human like email..." />
              </Form.Group>

              <Form.Group className="mb-3" controlId="status">
                <Form.Label>Have you read this book?</Form.Label>
                <Form.Control type="checkbox" placeholder="Human like email..." />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.props.hideModal}>
                Submit
              </Button>

            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default EditModal;
