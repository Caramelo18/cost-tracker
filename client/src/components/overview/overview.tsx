import React from 'react';
import './overview.css';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Transaction from './transaction/transaction';

class Overview extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.setState({showEdit: false, showDelete: false});

        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.submitDelete = this.submitDelete.bind(this);

        this.editTransactionCategory = this.editTransactionCategory.bind(this);
        this.editTransactionDescription = this.editTransactionDescription.bind(this);
        this.editTransactionValue = this.editTransactionValue.bind(this);
        this.editTransactionDate = this.editTransactionDate.bind(this);

        this.updateEditList = this.updateEditList.bind(this);
        this.updateDeleteList = this.updateDeleteList.bind(this);

    }

    componentDidMount(){
        let url = "http://localhost:8080/transactions"
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({transactions: data, modalData: {}});
        });
    }

    fillTable() {
        let rows: object[] = [];
        this.state.transactions.forEach((transaction: any) => {
            rows.push(<Transaction key={transaction.id} id={transaction.id} category={transaction.category} description={transaction.description} value={transaction.value} date={transaction.date} toggleEdit={this.toggleEdit} toggleDelete={this.toggleDelete}></Transaction>)            
        });
        return rows;
    }

    toggleEdit(data: object) {
        this.setState({showEdit: !this.state.showEdit, modalData: data});
    }

    toggleDelete(data: object) {
        this.setState({showDelete: !this.state.showDelete, modalData: data});
    }

    submitEdit() {
        let url = "http://localhost:8080/transactions/" + this.state.modalData.id;
        let data = { 'category': this.state.modalData.category, 'description': this.state.modalData.description, 'value': this.state.modalData.value, 'date': this.state.modalData.date };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(response => this.updateEditList(response));

        this.toggleEdit({});
    }

    submitDelete() {
        let id = this.state.modalData.id;
        let url = "http://localhost:8080/transactions/" + id;

        fetch(url, {
            method: 'DELETE',
        }).then(response => this.updateDeleteList(id));

        this.toggleDelete({});
    }

    editTransactionCategory(event: any) {
        let modalData = Object.assign({}, this.state.modalData);
        modalData.category = event.target.value;
        this.setState({modalData: modalData});
    }

    editTransactionDescription(event: any) {
        let modalData = Object.assign({}, this.state.modalData);
        modalData.description = event.target.value;
        this.setState({modalData: modalData});
    }

    editTransactionValue(event: any) {
        let modalData = Object.assign({}, this.state.modalData);
        modalData.value = event.target.value;
        this.setState({modalData: modalData});
    }

    editTransactionDate(event: any) {
        let modalData = Object.assign({}, this.state.modalData);
        modalData.date = event.target.value;
        this.setState({modalData: modalData});
    }

    updateEditList(updatedTransaction: any) {
        let transactions = this.state.transactions.slice();
        
        transactions.forEach((transaction: any) => {
            if(transaction.id === updatedTransaction.id) {
                transaction.category = updatedTransaction.category;
                transaction.description = updatedTransaction.description;
                transaction.value = updatedTransaction.value;
                transaction.date = updatedTransaction.date;
            }
        });
        
        this.setState({transactions: transactions});
    }

    updateDeleteList(removedId: string) {
        let transactions = [];
        
        for(let transaction of this.state.transactions){
            console.log(transaction.id, removedId);
            if (transaction.id !== removedId)
                transactions.push(transaction);
        }

        this.setState({transactions: transactions});
    }

    render() {
        let content;
        if (!this.state){
            content = <div>Loading</div>
        } else {
            content = <>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Value</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.fillTable()}
                </tbody>
            </Table>

            <Modal show={this.state.showEdit} onHide={() => this.setState({showEdit: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Category
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.modalData.category} onChange={this.editTransactionCategory}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.modalData.description} onChange={this.editTransactionDescription}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Value
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="number" pattern="[0-9]" value={this.state.modalData.value} onChange={this.editTransactionValue}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Date
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.modalData.date} onChange={this.editTransactionDate}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.submitEdit}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={this.state.showDelete} onHide={() => this.setState({showDelete: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="3">Category</Col>
                        <Col>{this.state.modalData.category}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Description</Col>
                        <Col>{this.state.modalData.description}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Value</Col>
                        <Col>{this.state.modalData.value}</Col>
                    </Row>
                    <Row>
                        <Col sm="3">Date</Col>
                        <Col>{this.state.modalData.date}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.toggleDelete}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.submitDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
            
        }

        return (
            content            
        )
    }

}

export default Overview;