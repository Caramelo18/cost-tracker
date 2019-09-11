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
        let startDate = new Date(this.props.modalData.startDate).toDateString();
        let paidUntil = new Date(this.props.modalData.paidUntil).toDateString();
        return (
            <Modal show={this.props.showDelete} onHide={() => this.props.toggleDelete({})}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="4">Category</Col>
                        <Col>{this.props.modalData.category}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Description</Col>
                        <Col>{this.props.modalData.description}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Periodicity</Col>
                        <Col>{this.props.modalData.periodicity}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Days Interval</Col>
                        <Col>{this.props.modalData.daysInterval}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Start Date</Col>
                        <Col>{startDate}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Paid Until</Col>
                        <Col>{paidUntil}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Value</Col>
                        <Col>{this.props.modalData.value}</Col>
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