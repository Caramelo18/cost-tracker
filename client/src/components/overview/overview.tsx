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

        this.setState({showCreate: false, showEdit: false, showDelete: false, modalData: {}});

        this.toggleCreate = this.toggleCreate.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.submitDelete = this.submitDelete.bind(this);

        this.editTransactionCategory = this.editTransactionCategory.bind(this);
        this.editTransactionDescription = this.editTransactionDescription.bind(this);
        this.editTransactionValue = this.editTransactionValue.bind(this);
        this.editTransactionDate = this.editTransactionDate.bind(this);

        this.updateCreateList = this.updateCreateList.bind(this);
        this.updateEditList = this.updateEditList.bind(this);
        this.updateDeleteList = this.updateDeleteList.bind(this);

    }

    componentDidMount(){
        this.loadTransactions();
        this.loadBalance()
    }

    loadTransactions() {
        let transactionsUrl = "http://localhost:8080/transactions";
        
        fetch(transactionsUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({transactions: data, modalData: {}});
        });
    }

    loadBalance() {
        let balanceUrl = "http://localhost:8080/balance";
        fetch(balanceUrl)
        .then(response => response.json())
        .then(data => {
            this.setState({balance: data.balance});
        });
    }

    fillTable() {
        if(!('transactions' in this.state)){
            return;
        }
        let rows: object[] = [];
        this.state.transactions.forEach((transaction: any) => {
            rows.push(<Transaction key={transaction.id} id={transaction.id} category={transaction.category} description={transaction.description} value={transaction.value} date={transaction.date} toggleEdit={this.toggleEdit} toggleDelete={this.toggleDelete}></Transaction>)            
        });
        return rows;
    }

    toggleCreate() {
        let data;
        if (this.state.showCreate === false) {
            data = { 'category': '', 'description': '', 'value': '', 'date': '' };
        } else {
            data = {}
        }
        this.setState({showCreate: !this.state.showCreate, modalData: data});
    }

    toggleEdit(data: object) {
        this.setState({showEdit: !this.state.showEdit, modalData: data});
    }

    toggleDelete(data: object) {
        this.setState({showDelete: !this.state.showDelete, modalData: data});
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
        });

        this.toggleCreate();
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
        });

        this.toggleEdit({});
    }

    submitDelete() {
        let id = this.state.modalData.id;
        let url = "http://localhost:8080/transactions/" + id;

        fetch(url, {
            method: 'DELETE',
        }).then(() => {
            this.updateDeleteList(id);
            this.loadBalance();
        });

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

    updateCreateList(newTransaction: any) {
        let transactions = this.state.transactions;
        transactions.push(newTransaction);
        this.setState({transactions: transactions});
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
            <Row className="top-bar">
                <Col>
                    <Row className="text-md-right">
                        <Col sm={12} className="balanceValue">{this.state.balance}</Col>
                    </Row>
                    <Row className="balanceLabel text-right">
                        
                        <Col sm={12}>Balance</Col>
                    </Row>
                </Col>
                <Col sm={8}></Col>
                <Col className="addButtonContainer">
                    <Button  variant="success" onClick={this.toggleCreate}>Add Transaction</Button>
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
                editTransactionCategory={this.editTransactionCategory} editTransactionDescription={this.editTransactionDescription}
                editTransactionValue={this.editTransactionValue} />
            
            <EditModal showEdit={this.state.showEdit} toggleEdit={this.toggleEdit} 
                modalData={this.state.modalData} submitEdit={this.submitEdit}
                editTransactionCategory={this.editTransactionCategory} editTransactionDescription={this.editTransactionDescription}
                editTransactionValue={this.editTransactionValue} editTransactionDate={this.editTransactionDate} />
            
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