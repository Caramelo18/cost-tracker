import React from 'react';
import './subscriptions.css';

import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Subscription from './subscription/subscription';
import AddModal from './add-modal/add-modal';
import PayModal from './pay-modal/pay-modal';
import EditModal from './edit-modal/edit-modal';
import DeleteModal from './delete-modal/delete-modal';

import { StateContext } from '../app/StateProvider';
import * as CTService from '../app/CostTrackerService';

class Subscriptions extends React.Component<any, any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.editModalData = this.editModalData.bind(this);

        this.submitAdd = this.submitAdd.bind(this);
        this.submitPay = this.submitPay.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.submitDelete = this.submitDelete.bind(this);

        this.togglePay = this.togglePay.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    componentDidMount() {
        this.setState({ showAdd: false, showPay: false, showEdit: false, showDelete: false, subscriptions: [] });
    }

    toggleAdd() {
        let modalData;
        if (this.state.showAdd === false) {
            modalData = { category: 'Needs', periodicity: 'Monthly' };
        }
        this.setState({ showAdd: !this.state.showAdd, modalData: modalData });
    }

    togglePay(data: any) {
        this.setState({ showPay: !this.state.showPay, modalData: data });
    }

    toggleEdit(data: any) {
        this.setState({ showEdit: !this.state.showEdit, modalData: data });
    }

    toggleDelete(data: any) {
        this.setState({ showDelete: !this.state.showDelete, modalData: data });
    }

    editModalData(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        let modalData = Object.assign({}, this.state.modalData);
        modalData[name] = value;

        this.setState({ modalData: modalData });
    }

    async submitAdd() {
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

        const response = await CTService.addSubscription(data);
        this.addSubscription(response);
        this.toggleAdd();
    }

    submitPay() {
        let url = "http://localhost:8080/subscriptions/pay";

        let data = this.state.modalData;

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

    async submitEdit() {
        let data = this.state.modalData;
        
        const response = await CTService.editSubscription(data.id, data);
        
        this.editSubscription(response);
        this.toggleEdit({});
    }

    async submitDelete() {
        const id = this.state.modalData.id;

        
        const deletedId = await CTService.deleteSubscription(id);
        this.deleteSubscription(deletedId);
        this.toggleDelete({});

    }

    addSubscription(subscription: any) {
        const [, dispatch] = this.context;

        dispatch({
            type: 'addSubscription',
            subscription: subscription
        });
    }

    editSubscription(subscription: any) {
        const [{ subscriptions }, dispatch] = this.context;

        subscriptions.forEach((element: any) => {
            if(element.id === subscription.id){
                element.category = subscription.category;
                element.description = subscription.description;
                element.value = subscription.value;
                element.periodicity = subscription.periodicity;
                element.daysInterval = subscription.daysInterval;
                element.paidUntil = subscription.paidUntil;
                element.startDate = subscription.startDate;
            }
        });

        dispatch({
            type: 'setSubscriptions',
            subscriptions: subscriptions
        });
    }

    deleteSubscription(subscriptionId: any) {
        const [{ subscriptions }, dispatch] = this.context;
        
        let newSubscriptions: any[] = [];

        subscriptions.forEach((element: any) => {
            if(element.id !== subscriptionId)  {
                newSubscriptions.push(element);
            }
        });

        dispatch({
            type: 'setSubscriptions',
            subscriptions: newSubscriptions
        });
    }

    fillTable(subscriptions: any) {
        let rows: any[] = [];

        subscriptions.forEach((subscription: any) => {
            let element = <Subscription key={subscription.id} id={subscription.id} category={subscription.category} description={subscription.description} value={subscription.value}
                periodicity={subscription.periodicity} paidUntil={subscription.paidUntil} daysInterval={subscription.daysInterval} startDate={subscription.startDate}
                togglePay={this.togglePay} toggleEdit={this.toggleEdit} toggleDelete={this.toggleDelete} />
            rows.push(element);
        });

        return rows;
    }

    render() {
        const [{ loaded }] = this.context;

        if (!loaded || !this.state) {
            return <div>Loading</div>;
        }

        const [{ subscriptions }] = this.context;

        const tableRows = this.fillTable(subscriptions);

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
                            <th>Paid Until</th>
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

            <EditModal showEdit={this.state.showEdit} toggleEdit={this.toggleEdit}
                modalData={this.state.modalData} submitEdit={this.submitEdit}
                editModalData={this.editModalData} />

            <DeleteModal showDelete={this.state.showDelete} toggleDelete={this.toggleDelete}
                modalData={this.state.modalData} submitDelete={this.submitDelete} />

        </>
        );
    }
}

export default Subscriptions;
