import React from 'react';
import './subscription.css';

import Button from 'react-bootstrap/Button';

class Subscription extends React.Component<any, any> {

    render() {
        return (
            <tr>
                <td className="align-middle">{this.props.category}</td>
                <td className="align-middle">{this.props.description}</td>
                <td className="align-middle">{this.props.value}</td>
                <td className="align-middle">{this.props.periodicity}</td>
                <td className="align-middle">{this.props.lastPayment}</td>
                <td className="align-middle">days left</td>
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