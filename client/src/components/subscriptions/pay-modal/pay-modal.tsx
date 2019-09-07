import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class PayModal extends React.Component<any, any> {

    render() {
        if (!this.props.modalData) {
            return null;
        }

        return (
            <Modal show={this.props.showPay} onHide={() => this.props.togglePay()}>
                <Modal.Header closeButton>
                    <Modal.Title>Pay Subscription</Modal.Title>
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
                        <Col sm="3">Periodicity</Col>
                        <Col>{this.props.modalData.periodicity}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Last Payment</Col>
                        <Col>{this.props.modalData.lastPayment}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Days Left</Col>
                        <Col>{this.props.modalData.daysLeft}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.togglePay()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.submitPay}>
                        Pay
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default PayModal;