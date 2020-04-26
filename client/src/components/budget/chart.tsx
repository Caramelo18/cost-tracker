import React from 'react'
import { Chart } from 'react-charts'

import { groupTransactionsByMonth } from '../../utils/utils';

function BudgetChart(props: any) {
    const data = React.useMemo(() => getChartData(props.transactions, props.monthsToAnalyze), [props.transactions, props.monthsToAnalyze]);

    const axes = React.useMemo(
        () => [
          { primary: true, type: 'ordinal', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
    

    return (
      <div style={{width: '100%', height: '500px' }}>
        <Chart data={data} axes={axes} tooltip />
      </div>
    )
  }

  export default BudgetChart;


function getChartData(transactions: any[], monthsToAnalyze: number) {
    const transactionsByMonth = groupTransactionsByMonth(transactions);

    let months = Object.keys(transactionsByMonth);

    let monthsResult = {};

    for (const month of months) {
        monthsResult[month] = groupTransactions(transactionsByMonth[month]);
    }

    months = months.slice(0, monthsToAnalyze).reverse();
    
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
    
    return [
        {
          label: 'Needs',
          data: needs
        },
        {
          label: 'Wants',
          data: wants
        },
        {
          label: 'Credit',
          data: credit
        },
      ];
}

function groupTransactions(transactions: any[]) {
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