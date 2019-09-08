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
        let date: any, daysLeft;
        if(this.props.modalData.paidUntil == null) {
            date = null;
            daysLeft = null;
        } else {
            date = new Date(this.props.modalData.paidUntil)
            let currentDate: any = new Date();
            daysLeft = Math.round((date - currentDate) / (1000 * 60 * 60 * 24));
            date = date.toDateString();
        }
        return (
            <Modal show={this.props.showPay} onHide={() => this.props.togglePay()}>
                <Modal.Header closeButton>
                    <Modal.Title>Pay Subscription</Modal.Title>
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
                        <Col sm="4">Value</Col>
                        <Col>{this.props.modalData.value}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Periodicity</Col>
                        <Col>{this.props.modalData.periodicity}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Paid Until</Col>
                        <Col>{date}</Col>
                    </Row>
                    <Row>
                        <Col sm="4">Days Left</Col>
                        <Col>{daysLeft}</Col>
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