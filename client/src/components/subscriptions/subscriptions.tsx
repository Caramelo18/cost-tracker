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
    }

    componentDidMount() {
        this.setState({ showAdd: false });
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
            data.periodicity = 30;
        } else if (data.periodicity === "3 Months") {
            data.periodicity = 90;
        } else if (data.periodicity === "6 Months") {
            data.periodicity = 182;
        } else if (data.periodicity === "Yearly") {
            data.periodicity = 365;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                this.toggleAdd();
            });

    }

    render() {
        if (this.state == null) {
            return <div>
                Loading
            </div>
        }

        return (<>
            <Button onClick={this.toggleAdd}>Add Subscription</Button>


            <AddModal showAdd={this.state.showAdd} toggleAdd={this.toggleAdd}
                modalData={this.state.modalData} submitAdd={this.submitAdd}
                editModalData={this.editModalData} />

        </>
        );
    }
}

export default Subscriptions;
