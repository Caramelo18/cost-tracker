import React from 'react';
import './overview.css';

import Table from 'react-bootstrap/Table';

import Transaction from './transaction/transaction';
import EditModal from './edit-modal/edit-modal';
import DeleteModal from './delete-modal/delete-modal';

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
            
            <EditModal showEdit={this.state.showEdit} toggleEdit={this.toggleEdit} 
                modalData={this.state.modalData} submitEdit={this.submitEdit}
                editTransactionCategory={this.editTransactionCategory} editTransactionDescription={this.editTransactionDescription}
                editTransactionValue={this.editTransactionValue} editTransactionDate={this.editTransactionDate}/>
            
            <DeleteModal showDelete={this.state.showDelete} toggleDelete={this.toggleDelete} 
                modalData={this.state.modalData} submitDelete={this.submitDelete}/>
            
            </>
            
        }

        return (
            content            
        )
    }

}

export default Overview;