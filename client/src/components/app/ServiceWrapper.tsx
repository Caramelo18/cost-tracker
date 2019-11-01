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
        })

        dispatch({
            type: 'setLoaded'
        });
    }

    async loadTransactions(): Promise<any> {
        const transactionsUrl = "http://localhost:8080/transactions";

        return fetch(transactionsUrl)
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    async loadBalance(): Promise<any> {
        const balanceUrl = "http://localhost:8080/balance";

        return fetch(balanceUrl)
            .then(response => response.json())
            .then(data => {
                return data.balance;
            });
    }

    async loadSubscriptions(): Promise<any> {
        const url = "http://localhost:8080/subscriptions";

        return fetch(url).then(response => response.json()).then(response => {
            return response;
        });
    }

    async loadSalaries(): Promise<any> {
        const url = "http://localhost:8080/salaries";

        return fetch(url)
            .then(response => response.json())
            .then(response => {
                return response;
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
