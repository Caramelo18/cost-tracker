import React from 'react';
import './budget.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Chart from 'react-charts';
import BudgetChart from './chart';

import { groupTransactionsByMonth } from '../../utils/utils';


import { StateContext } from '../app/StateProvider';

interface ChartItem {
    month: string,
    count: number,
    total: number,
}

const chartData: ChartItem[] = [
    { month: 'Jan', count: 50, total: 987 },
    { month: 'Feb', count: 100, total: 3000 },
    { month: 'March', count: 30, total: 1100 },
    { month: 'April', count: 107, total: 7100 },
    { month: 'May', count: 95, total: 4300 },
    { month: 'June', count: 150, total: 7500 },
];

class Budget extends React.Component<any, any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);

        this.editMonthsToAnalyze = this.editMonthsToAnalyze.bind(this);
    }

    componentDidMount() {
        this.setState({monthsToAnalyze: 6});
    }

    editMonthsToAnalyze(event: any) {
        let string: any = event.target.value;
        this.setState({ monthsToAnalyze: string });
    }

    // data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    getChartData(transactions: any[]) {
        const transactionsByMonth = groupTransactionsByMonth(transactions);

        let months = Object.keys(transactionsByMonth);

        this.groupTransactions(transactionsByMonth[months[0]]);

        let monthsResult = {};

        for (const month of months) {
            monthsResult[month] = this.groupTransactions(transactionsByMonth[month]);
        }

        months = months.slice(0, this.state.monthsToAnalyze).reverse();
        
        let needs: any[] = [], wants: any[] = [], credit: any[] = [];

        for (const month of months) {
            if ('Needs' in monthsResult[month]) {
                needs.push([month, monthsResult[month].Needs.ammount]);
            }
            else {
                needs.push([month, 0]);
            }
            if ('Wants' in monthsResult[month]) {
                wants.push([month, monthsResult[month].Wants.ammount]);
            } else {
                wants.push([month, 0]);
            }
            if ('Credit' in monthsResult[month]) {
                credit.push([month, monthsResult[month].Credit.ammount]);
            } else {
                credit.push([month, 0]);
            }
        }
        
        return { needs: needs, wants: wants, credit: credit};
    }

    groupTransactions(transactions: any[]) {
        return transactions.reduce((accumulator: any, currTransaction: any) => {
            const category = currTransaction.category;
            
            if(category in accumulator) {
                accumulator[category]['count'] += 1;
                accumulator[category]['ammount'] += Math.abs(currTransaction.value);
            } else {
                accumulator[category] = { 'count': 1, 'ammount': Math.abs(currTransaction.value)};
            }
            return accumulator;
        }, Object.create(null));
    }

    render() {
        const [{ loaded, transactions }] = this.context;

        if (!loaded || this.state == null) {
            return "Loading";
        }

        const chartData = this.getChartData(transactions);

        console.log(chartData);

        return (
            <>
            <div>
                <input value={this.state.monthsToAnalyze} onChange={this.editMonthsToAnalyze} />
                Budget content {this.state.monthsToAnalyze}
            </div>

            <BudgetChart data={chartData} />
            </>
        );
    }
}

export default Budget;
