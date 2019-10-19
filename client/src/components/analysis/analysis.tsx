import React from 'react';
import './analysis.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { StateContext } from '../app/StateProvider'

class Analysis extends React.Component<any, any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);
        this.groupTransactions = this.groupTransactions.bind(this);
    }

    componentDidMount() {
        const [{ transactions }] = this.context;
        this.setState({ transactions: transactions }, () => this.groupTransactions());
    }

    groupTransactions() {
        const transactions = this.state.transactions;

        let groupedTransactions: any = {};

        groupedTransactions = transactions.reduce((accumulator: any, currTransaction: any) => {
            const description = this.parseDescription(currTransaction.description);
            accumulator[description] = accumulator[description] || [];
            accumulator[description].push(currTransaction);
            return accumulator;
        }, Object.create(null));

        console.log(groupedTransactions);

    }

    parseDescription(description: string) {
        return description.split(" ")[0];
    }

    render() {
        return (
            <div>Analysis tab</div>
        );
    }
}

export default Analysis;
