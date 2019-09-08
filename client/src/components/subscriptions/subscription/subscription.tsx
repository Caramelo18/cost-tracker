import React from 'react';
import './subscription.css';

import Button from 'react-bootstrap/Button';

class Subscription extends React.Component<any, any> {

    render() {
        let date: any, daysLeft;
        if(this.props.paidUntil == null) {
            date = null;
            daysLeft = null;
        } else {
            date = new Date(this.props.paidUntil)
            let currentDate: any = new Date();
            daysLeft = Math.round((date - currentDate) / (1000 * 60 * 60 * 24));
            date = date.toDateString();
        }
        return (
            <tr>
                <td className="align-middle">{this.props.category}</td>
                <td className="align-middle">{this.props.description}</td>
                <td className="align-middle">{this.props.value}</td>
                <td className="align-middle">{this.props.periodicity}</td>
                <td className="align-middle">{date}</td>
                <td className="align-middle">{daysLeft}</td>
                <td className="align-middle">
                    <Button onClick={() => this.props.togglePay(this.props)}>Pay</Button>
                    <Button variant="warning" onClick={() => this.props.toggleEdit(this.props)}>Edit</Button>
                    <Button variant="danger" onClick={() => this.props.toggleDelete(this.props)}>Delete</Button>
                </td>
            </tr>
        );
    }

}

export default Subscription;