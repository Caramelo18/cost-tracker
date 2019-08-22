import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class EditModal extends React.Component<any, any> {

    invalidInput(): boolean {
        return this.props.modalData.location == null || this.props.modalData.company == null || this.props.modalData.role == null
            || this.props.modalData.yearGrossValue == null || this.props.modalData.grossValue == null || this.props.modalData.netValue == null;
    }

    render() {
        if (!this.props.modalData){
            return null;
        }
        return (
            <Modal show={this.props.showEdit} onHide={() => this.props.toggleEdit()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Salary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Location
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="location" value={this.props.modalData.location} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Company
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="company" value={this.props.modalData.company} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Role
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="role" value={this.props.modalData.role} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Year Gross Salary
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" name="yearGrossValue" value={this.props.modalData.yearGrossValue} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Gross Salary
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" name="grossValue" value={this.props.modalData.grossValue} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Net Salary
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" name="netValue" value={this.props.modalData.netValue} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.toggleEdit()}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.props.submitDelete}>
                        Delete
                    </Button>
                    <Button variant="warning" disabled={this.invalidInput()} onClick={this.props.submitEdit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default EditModal;