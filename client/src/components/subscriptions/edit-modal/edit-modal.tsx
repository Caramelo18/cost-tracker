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
                    <Modal.Title>Edit Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Category
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="category" value={this.props.modalData.category} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Description
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="description" value={this.props.modalData.description} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Periodicity
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="periodicity" value={this.props.modalData.periodicity} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Days Interval
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" name="daysInterval" value={this.props.modalData.daysInterval} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Start Date
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="startDate" value={this.props.modalData.startDate} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Paid Until
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="paidUntil" value={this.props.modalData.paidUntil} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Value
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" name="value" value={this.props.modalData.value} onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.toggleEdit()}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={this.props.submitEdit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default EditModal;