import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class AddModal extends React.Component<any, any> {

    invalidInput(): boolean {
        return this.props.modalData.category == null || this.props.modalData.description == null || this.props.modalData.value == null;
    }

    render() {
        if (!this.props.modalData){
            return null;
        }
        return (
            <Modal show={this.props.showAdd} onHide={() => this.props.toggleAdd()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Salary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Location
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" value={this.props.modalData.category} onChange={this.props.editTransactionCategory}>
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
                                <Form.Control type="text" value={this.props.modalData.description} onChange={this.props.editTransactionDescription} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Value
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" pattern="[0-9]" value={this.props.modalData.value} onChange={this.props.editTransactionValue} required/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.toggleAdd()}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={this.invalidInput()} onClick={this.props.submitCreate}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default AddModal;