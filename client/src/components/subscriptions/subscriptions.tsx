import React from 'react';
import './subscriptions.css';

import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Subscription from './subscription/subscription';
import AddModal from './add-modal/add-modal';
import PayModal from './pay-modal/pay-modal';

class Subscriptions extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.loadSubscriptions = this.loadSubscriptions.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.editModalData = this.editModalData.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
        this.submitPay = this.submitPay.bind(this);
        this.updateSubscriptions = this.updateSubscriptions.bind(this);
        this.togglePay = this.togglePay.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    componentDidMount() {
        this.setState({ showAdd: false, showPay: false, subscriptions: [] });
        this.loadSubscriptions();
    }

    loadSubscriptions() {
        let url = "http://localhost:8080/subscriptions";

        fetch(url).then(response => response.json()).then(response => {
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

    togglePay(data: any) {
        console.log(data);
        this.setState({ showPay: !this.state.showPay, modalData: data });
    }

    toggleEdit() {
        console.log("toggle edit");
    }

    toggleDelete() {
        console.log("toggle delete");
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

    submitPay() {
        console.log("pay");
        let url = "http://localhost:8080/subscriptions/pay";

        let data = this.state.modalData;

        console.log(data);
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            });

        this.togglePay([]);
    }

    updateSubscriptions(subscription: any) {
        let subscriptions = this.state.subscriptions;
        subscriptions.push(subscription);
        this.setState({ subscriptions: subscriptions });
    }

    fillTable() {
        let rows: any[] = [];

        this.state.subscriptions.forEach((subscription: any) => {
            let element = <Subscription key={subscription.id} id={subscription.id} category={subscription.category} description={subscription.description} value={subscription.value}
                periodicity={subscription.periodicity} paidUntil={subscription.paidUntil} daysInterval={subscription.daysInterval} startDate={subscription.startDate}
                togglePay={this.togglePay} toggleEdit={this.toggleEdit} toggleDelete={this.toggleDelete} />
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

            <PayModal showPay={this.state.showPay} togglePay={this.togglePay}
                modalData={this.state.modalData} submitPay={this.submitPay}
            />

        </>
        );
    }
}

export default Subscriptions;
