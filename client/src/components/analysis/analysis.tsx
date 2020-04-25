import React from 'react';
import './analysis.css';

import { StateContext } from '../app/StateProvider';

import AnalysisTable from './table';


class Analysis extends React.Component<any, any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);
        this.groupTransactions = this.groupTransactions.bind(this);
        this.groupTransactionsByMonth = this.groupTransactionsByMonth.bind(this);
        this.editMonthsToAggregate = this.editMonthsToAggregate.bind(this);
    }

    componentDidMount() {
        this.setState({ monthsToAggregate: 3 });
    }

    groupTransactions(transactions: any) {

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
            summarizedTransactions[key]['average'] = Math.round(summarizedTransactions[key]['average'] * 100) / 100;
        }

        return summarizedTransactions;
    }

    groupTransactionsByMonth(transactions: any[]) {
        const groupedByMonth = transactions.reduce((acc, transaction) => {
            let date = new Date(transaction["date"]);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const dateKey = year + "/" + month;

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(transaction);

            return acc;
        }, {});


        let grouped: any = {};

        for (let month in groupedByMonth) {
            grouped[month] = this.groupTransactions(groupedByMonth[month]);
        }

        return grouped;
    }

    findRecurringTransactions(transactions: any[]) {
        const groupedMonthlyTransactions = this.groupTransactionsByMonth(transactions);
        const monthsToInclude = this.state.monthsToAggregate;

        let months = Object.keys(groupedMonthlyTransactions);
        months = months.slice(0, monthsToInclude);

        let recurringTransactions: any = {};

        for (let month of months) {
            const monthTransactions = groupedMonthlyTransactions[month];
            for (let transactionType in monthTransactions) {
                if (!(transactionType in recurringTransactions)) {
                    recurringTransactions[transactionType] = {};
                }
                recurringTransactions[transactionType][month] = groupedMonthlyTransactions[month][transactionType];
            }
        }

        let transactionsToDelete = [];
        for (let transactionType in recurringTransactions) {
            // TODO: allow multiple transactions on one month
            if (Object.keys(recurringTransactions[transactionType]).length < 2) {
                transactionsToDelete.push(transactionType);
            }
        }

        for (let transactionToDelete of transactionsToDelete) {
            delete recurringTransactions[transactionToDelete];
        }

        for (let transactionType in recurringTransactions) {
            let total = 0;
            let count = 0;
            let avgPerMonth;
            for (let month in recurringTransactions[transactionType]) {
                const transTypeInMonth = recurringTransactions[transactionType][month];
                total += transTypeInMonth['total'];
                count += transTypeInMonth['count'];
            }
            avgPerMonth = total / Object.keys(recurringTransactions[transactionType]).length;
            avgPerMonth = Math.round(avgPerMonth * 100) / 100;

            recurringTransactions[transactionType]['total'] = total;
            recurringTransactions[transactionType]['count'] = count;
            recurringTransactions[transactionType]['avgPerMonth'] = avgPerMonth;
        }

        return recurringTransactions;
    }

    parseDescription(description: string) {
        return description.split(" ")[0];
    }

    parseDataToTable(transactions: any) {
        let array = [];
        for (let key in transactions) {
            let data = transactions[key];
            data['description'] = key;
            array.push(data);
        }

        array = array.filter(desc => desc.total < 0);
        return array;
    }

    getTableHeader() {
        return [
            {
                Header: "Description",
                accessor: "description"
            },
            {
                Header: "Count",
                accessor: "count"
            },
            {
                Header: "Total",
                accessor: "total"
            },
            {
                Header: "Average",
                accessor: "average"
            }
        ]
    }

    getRecurringTransactionsHeader() {
        return [
            {
                Header: "Description",
                accessor: "description"
            },
            {
                Header: "Count",
                accessor: "count"
            },
            {
                Header: "Total",
                accessor: "total"
            },
            {
                Header: "Average Per Month",
                accessor: "avgPerMonth"
            }
        ]
    }

    editMonthsToAggregate(event: any) {
        let string: any = event.target.value;
        this.setState({ monthsToAggregate: string });
    }

    render() {
        const [{ loaded }] = this.context;

        if (!loaded || this.state == null) {
            return <div>Loading</div>;
        }
        const [{ transactions }] = this.context;

        const groupedTransactions = this.parseDataToTable(this.groupTransactions(transactions));
        const recurringTransactions = this.parseDataToTable(this.findRecurringTransactions(transactions));
        
        const tableHeader = this.getTableHeader();

        return (
            <>
                <div>
                    <h4>Grouped Transactions</h4>
                    <AnalysisTable data={groupedTransactions} header={tableHeader} orderBy="total"/>
                </div>

                <div className="recurringExpansesDiv">
                    <span className="recurringExpensesSpan">
                        <h4>Recurring Expenses</h4>
                        <span>
                            <label>Months To Include:</label>
                            <input value={this.state.monthsToAggregate} onChange={this.editMonthsToAggregate} className="monthsInput"/>
                        </span>
                    </span>
                    <AnalysisTable data={recurringTransactions} header={this.getRecurringTransactionsHeader()} orderBy="avgPerMonth" />
                </div>
            </>
        );
    }
}

export default Analysis;
