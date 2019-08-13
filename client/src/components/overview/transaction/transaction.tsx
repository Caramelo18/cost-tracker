import React from 'react';
import './transaction.css';


import Button from 'react-bootstrap/Button';

class Transaction extends React.Component<any, any> {

    render() {
        let date = new Date(this.props.date);
        return (
            <tr>
                <td>{this.props.category}</td>
                <td>{this.props.description}</td>
                <td>{this.props.value}</td>
                <td>{date.toDateString()}</td>
                <td> 
                    <Button variant="warning" onClick={() => this.props.toggleEdit(this.props)}>Edit</Button> 
                    <Button variant="danger" onClick={() => this.props.toggleDelete(this.props)}>Delete</Button>
                </td>
            </tr>
        );
    }

}

export default Transaction;