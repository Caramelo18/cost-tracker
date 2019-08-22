import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class AddModal extends React.Component<any, any> {

    invalidInput(): boolean {
        return this.props.modalData.location == null || this.props.modalData.company == null || this.props.modalData.role == null
            || this.props.modalData.yearGrossValue == null || this.props.modalData.grossValue == null || this.props.modalData.netValue == null;
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
                                <Form.Control type="text" name="location" onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Company
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="company" onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="3">
                                Role
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" name="role" onChange={this.props.editModalData} required/>
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
                                <Form.Control type="number" name="netValue" onChange={this.props.editModalData} required/>
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.toggleAdd()}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={this.invalidInput()} onClick={this.props.submitAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default AddModal;