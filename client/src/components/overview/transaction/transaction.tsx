import React from 'react';
import './transaction.css';


import Button from 'react-bootstrap/Button';

class Transaction extends React.Component<any, any> {

    render() {
        let date = new Date(this.props.date);
        return (
            <tr>
                <td className="align-middle">{this.props.category}</td>
                <td className="align-middle">{this.props.description}</td>
                <td className="align-middle">{this.props.value}</td>
                <td className="align-middle">{date.toDateString()}</td>
                <td className="align-middle"> 
                    <Button variant="warning" onClick={() => this.props.toggleEdit(this.props)}>Edit</Button> 
                    <Button variant="danger" onClick={() => this.props.toggleDelete(this.props)}>Delete</Button>
                </td>
            </tr>
        );
    }

}

export { Transaction as TransactionItem };