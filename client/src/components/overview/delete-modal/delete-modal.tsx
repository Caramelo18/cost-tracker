import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class DeleteModal extends React.Component<any, any> {

    render() {
        if (!this.props.modalData){
            return null;
        }
        return (
            <Modal show={this.props.showDelete} onHide={() => this.props.toggleDelete({})}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="3">Category</Col>
                        <Col>{this.props.modalData.category}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Description</Col>
                        <Col>{this.props.modalData.description}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Value</Col>
                        <Col>{this.props.modalData.value}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Date</Col>
                        <Col>{this.props.modalData.date}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDelete}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.submitDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default DeleteModal;