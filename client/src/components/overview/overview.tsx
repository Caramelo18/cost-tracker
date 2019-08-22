import React from 'react';
import './overview.css';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import Transaction from './transaction/transaction';
import CreateModal from './create-modal/create-modal';
import EditModal from './edit-modal/edit-modal';
import DeleteModal from './delete-modal/delete-modal';

class Overview extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.setState({ showCreate: false, showEdit: false, showDelete: false, modalData: {} });

        this.toggleCreate = this.toggleCreate.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.submitDelete = this.submitDelete.bind(this);

        this.editModalData = this.editModalData.bind(this);

        this.updateCreateList = this.updateCreateList.bind(this);
        this.updateEditList = this.updateEditList.bind(this);
        this.updateDeleteList = this.updateDeleteList.bind(this);

    }

    componentDidMount() {
        this.loadTransactions();
        this.loadBalance()
    }

    loadTransactions() {
        let transactionsUrl = "http://localhost:8080/transactions";

        fetch(transactionsUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ transactions: data, modalData: {} });
            });
    }

    loadBalance() {
        let balanceUrl = "http://localhost:8080/balance";
        fetch(balanceUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ balance: data.balance });
            });
    }

    sortTransactions(trA: any, trB: any) {
        return new Date(trA.date).getDate() < new Date(trB.date).getDate() ? 1 : -1;
    }

    fillTable() {
        if (!('transactions' in this.state)) {
            return;
        }
        
        let transactions = this.state.transactions.concat();
        transactions = transactions.sort(this.sortTransactions)
        
        let rows: object[] = [];
        transactions.forEach((transaction: any) => {
            rows.push(<Transaction key={transaction.id} id={transaction.id} category={transaction.category} description={transaction.description} value={transaction.value} date={transaction.date} toggleEdit={this.toggleEdit} toggleDelete={this.toggleDelete}></Transaction>)
        });
        return rows;
    }

    toggleCreate() {
        let data = { 'category': 'Needs' };
        this.setState({ showCreate: !this.state.showCreate, modalData: data });
    }

    toggleEdit(data: object) {
        this.setState({ showEdit: !this.state.showEdit, modalData: data });
    }

    toggleDelete(data: object) {
        this.setState({ showDelete: !this.state.showDelete, modalData: data });
    }

    submitCreate() {
        let url = "http://localhost:8080/transactions/";

        let data = this.state.modalData;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                this.updateCreateList(response);
                this.loadBalance();
                this.toggleCreate();
            });
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
            .then(response => {
                this.updateEditList(response);
                this.loadBalance();
                this.toggleEdit({});
            });
    }

    submitDelete() {
        let id = this.state.modalData.id;
        let url = "http://localhost:8080/transactions/" + id;

        fetch(url, {
            method: 'DELETE',
        }).then(() => {
            this.updateDeleteList(id);
            this.loadBalance();
            this.toggleDelete({});
        });
    }

    editModalData(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        let modalData = Object.assign({}, this.state.modalData);
        modalData[name] = value;

        this.setState({ modalData: modalData });
    }

    updateCreateList(newTransaction: any) {
        let transactions = this.state.transactions;
        transactions.push(newTransaction);
        this.setState({ transactions: transactions });
    }

    updateEditList(updatedTransaction: any) {
        let transactions = this.state.transactions.slice();

        transactions.forEach((transaction: any) => {
            if (transaction.id === updatedTransaction.id) {
                transaction.category = updatedTransaction.category;
                transaction.description = updatedTransaction.description;
                transaction.value = updatedTransaction.value;
                transaction.date = updatedTransaction.date;
            }
        });

        this.setState({ transactions: transactions });
    }

    updateDeleteList(removedId: string) {
        let transactions = [];

        for (let transaction of this.state.transactions) {
            if (transaction.id !== removedId)
                transactions.push(transaction);
        }

        this.setState({ transactions: transactions });
    }

    render() {
        let content;
        if (!this.state) {
            content = <div>Loading</div>
        } else {
            content = <>
                <Row className="top-bar">
                    <Col>
                        <Row className="text-md-right">
                            <Col sm={12} className="balanceValue">{this.state.balance}</Col>
                        </Row>
                        <Row className="balanceLabel text-md-right">
                            <Col sm={12}>Balance</Col>
                        </Row>
                    </Col>
                    <Col sm={8}></Col>
                    <Col className="addButtonContainer">
                        <Button variant="success" onClick={this.toggleCreate}>Add Transaction</Button>
                    </Col>

                </Row>

                <Row className="table-row">
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
                </Row>


                <CreateModal showCreate={this.state.showCreate} toggleCreate={this.toggleCreate}
                    modalData={this.state.modalData} submitCreate={this.submitCreate}
                    editModalData={this.editModalData} />

                <EditModal showEdit={this.state.showEdit} toggleEdit={this.toggleEdit}
                    modalData={this.state.modalData} submitEdit={this.submitEdit}
                    editModalData={this.editModalData} />

                <DeleteModal showDelete={this.state.showDelete} toggleDelete={this.toggleDelete}
                    modalData={this.state.modalData} submitDelete={this.submitDelete} />

            </>

        }

        return (
            content
        )
    }

}

export default Overview;