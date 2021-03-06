import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class EditModal extends React.Component<any, any> {

    render() {
        if (!this.props.modalData){
            return null;
        }
        return (
            <Modal show={this.props.showEdit} onHide={() => this.props.toggleEdit({})}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Category
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" name="category" value={this.props.modalData.category} onChange={this.props.editModalData}>
                                    <option>Needs</option>
                                    <option>Wants</option>
                                    <option>Other</option>
                                    <option>Credit</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Description
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="description" value={this.props.modalData.description} onChange={this.props.editModalData}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Value
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" pattern="[0-9]" name="value" value={this.props.modalData.value} onChange={this.props.editModalData}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Date
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="date" value={this.props.modalData.date} onChange={this.props.editModalData}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.submitEdit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default EditModal;