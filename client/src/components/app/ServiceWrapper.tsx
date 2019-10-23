import React from 'react';
import './App.css';

import * as CTService from './CostTrackerService';

import { StateContext } from '../app/StateProvider';
import { StateProvider, useStateValue, initialState } from './StateProvider';


class ServiceWrapper extends React.Component<any, any> {
    static contextType = StateContext;

    async componentDidMount() {
        const transactions = await CTService.loadTransactions();
        const [{ _ }, dispatch] = this.context;
        dispatch({
            type: 'setTransactions',
            newTransactions: transactions
        });
        dispatch({
            type: 'setLoaded',
            loaded: true
        });
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default ServiceWrapper;
