import React from 'react';
import './overview.css';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { TransactionItem } from './transaction/transaction';
import CreateModal from './create-modal/create-modal';
import EditModal from './edit-modal/edit-modal';
import DeleteModal from './delete-modal/delete-modal';

import { StateContext } from '../app/StateProvider';
import * as CTService from '../app/CostTrackerService';

class Overview extends React.Component<any, any> {
    static contextType = StateContext;


    constructor(props: any) {
        super(props);

        this.toggleCreate = this.toggleCreate.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.submitDelete = this.submitDelete.bind(this);

        this.filterEnabled = this.filterEnabled.bind(this);

        this.editModalData = this.editModalData.bind(this);
        this.editSearchString = this.editSearchString.bind(this);
        this.editSearchCategory = this.editSearchCategory.bind(this);
        this.editStartDate = this.editStartDate.bind(this);
        this.editEndDate = this.editEndDate.bind(this);

        this.updateEditList = this.updateEditList.bind(this);
        this.updateDeleteList = this.updateDeleteList.bind(this);
    }

    componentDidMount() {
        const currentDate: Date = new Date();
        let defaultStartDate: Date = new Date(currentDate.getTime());
        defaultStartDate.setDate(1);
        defaultStartDate.setHours(0, 0, 0);

        let defaultEndDate: Date = new Date(defaultStartDate.getFullYear(), defaultStartDate.getMonth() + 1, 0);
        defaultEndDate.setHours(23, 59, 59);

        const startDate: Date = defaultStartDate;
        const endDate: Date = defaultEndDate;

        this.setState({ showCreate: false, showEdit: false, showDelete: false, modalData: {}, searchString: "", searchCategories: ["Needs", "Wants", "Other", "Credit"], startDate: startDate, endDate: endDate, defaultStartDate: defaultStartDate, defaultEndDate: defaultEndDate });
    }

    async loadBalance() {
        const balance = await CTService.loadBalance();
        const [, dispatch] = this.context;

        dispatch({
            type: 'setBalance',
            balance: balance
        });
    }

    getBalance() {
        const [{ balance }] = this.context;
        return balance;
    }

    fillTable() {
        let rows: object[] = [];
        let [{ transactions }] = this.context;

        const transactionsInfo = this.filterTransactions(transactions);

        transactions = transactionsInfo['transactions'];
        const filterSummary = transactionsInfo['filterSummary'];

        transactions.forEach((transaction: any) => {
            rows.push(<TransactionItem key={transaction.id} id={transaction.id} category={transaction.category} description={transaction.description} value={transaction.value} date={transaction.date} toggleEdit={this.toggleEdit} toggleDelete={this.toggleDelete}></TransactionItem>)
        });

        return { transactions: rows, filterSummary: filterSummary };
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

    async submitCreate() {
        const response = await CTService.addTransaction(this.state.modalData);

        const [, dispatch] = this.context;
        dispatch({
            type: 'addTransaction',
            transaction: response
        });
        this.loadBalance();
        this.toggleCreate();
    }

    async submitEdit() {
        const id = this.state.modalData.id;
        const data = { 'category': this.state.modalData.category, 'description': this.state.modalData.description, 'value': this.state.modalData.value, 'date': this.state.modalData.date };

        const response = await CTService.editTransaction(id, data);

        this.updateEditList(response);
        this.loadBalance();
        this.toggleEdit({});
    }

    async submitDelete() {
        const idToDelete = this.state.modalData.id;
        const id = await CTService.deleteTransaction(idToDelete);

        this.updateDeleteList(id);
        this.loadBalance();
        this.toggleDelete({});
    }

    editModalData(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        let modalData = Object.assign({}, this.state.modalData);
        modalData[name] = value;

        this.setState({ modalData: modalData });
    }

    editStartDate(event: any) {
        let newDate = event;
        newDate.setHours(0, 0, 0);

        this.setState({ startDate: newDate });
    }

    editEndDate(event: any) {
        let newDate: Date = event;
        newDate.setHours(23, 59, 59);

        this.setState({ endDate: newDate });
    }

    updateEditList(updatedTransaction: any) {
        let [{ transactions }, dispatch] = this.context;

        transactions.forEach((transaction: any) => {
            if (transaction.id === updatedTransaction.id) {
                transaction.category = updatedTransaction.category;
                transaction.description = updatedTransaction.description;
                transaction.value = updatedTransaction.value;
                transaction.date = updatedTransaction.date;
            }
        });

        dispatch({
            type: 'setTransactions',
            newTransactions: transactions
        });
    }

    updateDeleteList(removedId: string) {
        let newTransactions = [];
        let [{ transactions }, dispatch] = this.context;

        for (let transaction of transactions) {
            if (transaction.id !== removedId)
                newTransactions.push(transaction);
        }

        dispatch({
            type: 'setTransactions',
            newTransactions: newTransactions
        });
    }

    filterEnabled() {
        if (this.state.searchCategories.length !== 4 || this.state.searchString !== "") {
            return true;
        }
        return false;
    }

    editSearchString(event: any) {
        let string: any = event.target.value;
        this.setState({ searchString: string });
    }

    editSearchCategory(event: any) {
        let category = event.target.name;
        let newCategories = this.state.searchCategories.slice(0);
        let index = newCategories.indexOf(category);

        if (index >= 0) {
            newCategories.splice(index, 1);
            this.setState({ searchCategories: newCategories });
        } else {
            newCategories.push(category);
            this.setState({ searchCategories: newCategories });
        }
    }

    filterTransactions(transactions: any) {
        const searchString = this.state.searchString.toLowerCase();
        const filteredCategories = this.state.searchCategories;

        let filteredTransactions: any[] = [];
        let totalValue: number = 0;

        transactions.forEach((transaction: any) => {
            const matchesCategory = filteredCategories.indexOf(transaction.category) >= 0;
            const description = transaction.description.toLowerCase();
            let matchesString = false;
            if (searchString === "" || description.indexOf(searchString) >= 0) {
                matchesString = true;
            }
            const date = new Date(transaction.date);
            const inDateRange = date >= this.state.startDate && date <= this.state.endDate;

            if (matchesCategory && matchesString && inDateRange) {
                filteredTransactions.push(transaction);
                totalValue += transaction.value;
            }
        });

        const numTransactions: number = filteredTransactions.length;
        const averageValue: number = Math.round((totalValue / numTransactions) * 100) / 100;
        let filterSummary = { 'numTransactions': numTransactions, 'averageValue': averageValue, 'totalValue': totalValue };

        return { transactions: filteredTransactions, filterSummary: filterSummary };
    }

    render() {
        let content;
        const [{ loaded }] = this.context;

        if (!loaded || !this.state) {
            content = <div>Loading</div>;
            return content;
        }

        const transactionsInfo = this.fillTable();
        const balance = this.getBalance();

        let transactions, filterSummary: any;
        if (transactionsInfo != null) {
            transactions = transactionsInfo!['transactions'] ? transactionsInfo!['transactions'] : [];
            filterSummary = transactionsInfo!['filterSummary'];
        }

        content = <>
            <Row className="overview-bar">
                <Col>
                    <Row className="text-md-right">
                        <Col sm={12} className="balanceValue">{balance}</Col>
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

            <Row className="search-bar justify-content-end">
                <div className="datePickerContainer">
                    <label>From: </label>
                    <DatePicker selected={this.state.startDate} onChange={this.editStartDate} />
                </div>

                <div className="datePickerContainer">
                    <label className="dateLabel">To: </label>
                    <DatePicker selected={this.state.endDate} onChange={this.editEndDate} />
                </div>

                <DropdownButton id="dropdown-basic-button" title="Category">
                    <Form.Group id="formGridCheckbox">
                        <Form.Check className="checkbox" type="checkbox" label="Needs" name="Needs" checked={this.state.searchCategories.includes("Needs")} onChange={this.editSearchCategory} />
                        <Form.Check className="checkbox" type="checkbox" label="Wants" name="Wants" checked={this.state.searchCategories.includes("Wants")} onChange={this.editSearchCategory} />
                        <Form.Check className="checkbox" type="checkbox" label="Other" name="Other" checked={this.state.searchCategories.includes("Other")} onChange={this.editSearchCategory} />
                        <Form.Check className="checkbox" type="checkbox" label="Credit" name="Credit" checked={this.state.searchCategories.includes("Credit")} onChange={this.editSearchCategory} />
                    </Form.Group>
                </DropdownButton>
                <Form className="">
                    <Form.Control type="text" placeholder="Search" value={this.state.searchString} onChange={this.editSearchString} />
                </Form>
            </Row>

            <Row className="justify-content-end">
                {this.filterEnabled() &&
                    <div className="filterSummary">
                        <span>
                            Transactions: {filterSummary!['numTransactions']}
                        </span>
                        <span>
                            Average value: {filterSummary['averageValue']}
                        </span>
                        <span>
                            Total value: {filterSummary['totalValue']}
                        </span>
                    </div>}
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
                        {transactions}
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

        return (
            content
        )
    }

}
export default Overview;