import React from 'react';
import './App.css';

import * as CTService from './CostTrackerService';

import { StateContext } from '../app/StateProvider';

class ServiceWrapper extends React.Component<any, any> {
    static contextType = StateContext;

    async componentDidMount() {
        const transactions = await CTService.loadTransactions();
        const balance = await CTService.loadBalance();
        const subscriptions = await CTService.loadSubscriptions();
        const salaries = await CTService.loadSalaries();

        const [, dispatch] = this.context;

        dispatch({
            type: 'setTransactions',
            newTransactions: transactions
        });

        dispatch({
            type: 'setBalance',
            balance: balance
        });

        dispatch({
            type: 'setSubscriptions',
            subscriptions: subscriptions
        });

        dispatch({
            type: 'setSalaries',
            salaries: salaries
        });

        dispatch({
            type: 'setLoaded'
        });
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default ServiceWrapper;
