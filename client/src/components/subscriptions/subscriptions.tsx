import React from 'react';
import './subscriptions.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import AddModal from './add-modal/add-modal';

class Subscriptions extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.loadSubscriptions = this.loadSubscriptions.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.editModalData = this.editModalData.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
        this.updateSubscriptions = this.updateSubscriptions.bind(this);
    }

    componentDidMount() {
        this.setState({ showAdd: false, subscriptions: [] });
        this.loadSubscriptions();
    }

    loadSubscriptions() {
        let url = "http://localhost:8080/subscriptions";

        fetch(url).then(response => response.json()).then(response => {
            console.log(response);
            this.setState({ subscriptions: response });
        })

    }

    toggleAdd() {
        let modalData;
        if (this.state.showAdd === false) {
            modalData = { category: 'Needs', periodicity: 'Monthly' };
        }
        this.setState({ showAdd: !this.state.showAdd, modalData: modalData });
    }

    editModalData(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        let modalData = this.state.modalData;
        modalData[name] = value;

        this.setState({ modalData: modalData });
    }

    submitAdd() {
        let url = "http://localhost:8080/subscriptions";
        let data = Object.assign({}, this.state.modalData);

        if (data.periodicity === "Monthly") {
            data.daysInterval = 30;
        } else if (data.periodicity === "3 Months") {
            data.daysInterval = 90;
        } else if (data.periodicity === "6 Months") {
            data.daysInterval = 182;
        } else if (data.periodicity === "Yearly") {
            data.daysInterval = 365;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                this.updateSubscriptions(response);
                this.toggleAdd();
            });

    }

    updateSubscriptions(subscription: any) {
        let subscriptions = this.state.subscriptions;
        subscriptions.push(subscription);
        this.setState({subscriptions: subscriptions});
    }

    fillTable() {
        let rows: any[] = [];
        console.log(this.state.subscriptions);

        this.state.subscriptions.forEach((subscription: any) => {
            let element = <tr>
                <td>{subscription.category}</td>
                <td>{subscription.description}</td>
                <td>{subscription.value}</td>
                <td>{subscription.periodicity}</td>
                <td>{subscription.lastPayment}</td>
            </tr>
            rows.push(element);
        });

        return rows;
    }

    render() {
        if (this.state == null) {
            return <div>
                Loading
            </div>
        }
        let tableRows = this.fillTable();

        return (<>
            <Button onClick={this.toggleAdd}>Add Subscription</Button>

            <Row className="table-row">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Value</th>
                            <th>Periodicity</th>
                            <th>Last Payment</th>
                            <th>Days Left</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </Row>


            <AddModal showAdd={this.state.showAdd} toggleAdd={this.toggleAdd}
                modalData={this.state.modalData} submitAdd={this.submitAdd}
                editModalData={this.editModalData} />

        </>
        );
    }
}

export default Subscriptions;
