import React from 'react';
import './analysis.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { StateContext } from '../app/StateProvider';

class Analysis extends React.Component<any, any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);
        this.groupAllTransactions = this.groupAllTransactions.bind(this);
        this.groupMonthlyTransactions = this.groupMonthlyTransactions.bind(this);
    }

    componentDidMount() {
    }

    groupAllTransactions(transactions: any) {

        let groupedTransactions: any = {};

        groupedTransactions = transactions.reduce((accumulator: any, currTransaction: any) => {
            const description = this.parseDescription(currTransaction.description);
            accumulator[description] = accumulator[description] || [];
            accumulator[description].push(currTransaction);
            return accumulator;
        }, Object.create(null));

        let summarizedTransactions: any = {};
        for (let key in groupedTransactions) {
            summarizedTransactions[key] = {};
            summarizedTransactions[key]['transactions'] = groupedTransactions[key]
            summarizedTransactions[key]['count'] = groupedTransactions[key].length;
            summarizedTransactions[key]['total'] = groupedTransactions[key].reduce((total: any, next: any) => total + next.value, 0);
            summarizedTransactions[key]['average'] = summarizedTransactions[key]['total'] / summarizedTransactions[key]['count'];
        }

        return summarizedTransactions;
    }

    groupMonthlyTransactions(transactions: any) {
        console.log(transactions);
        return transactions;
    }

    parseDescription(description: string) {
        return description.split(" ")[0];
    }

    render() {
        const [{ loaded }] = this.context;

        if (!loaded) {
            return <div>Loading</div>;
        }
        const [{ transactions }] = this.context;
        
        const groupedTransactions = this.groupAllTransactions(transactions);
        const groupedMonthlyTransactions = this.groupAllTransactions(transactions);

        console.log(groupedTransactions);

        return (
            <div>Analysis tab</div>
        );
    }
}

export default Analysis;
