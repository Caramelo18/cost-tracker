import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../header/header';
import Overview from '../overview/overview';
import Salary from '../salary/salary';
import Budget from '../budget/budget';
import Subscriptions from '../subscriptions/subscriptions';
import Analysis from '../analysis/analysis';

import ServiceWrapper from './ServiceWrapper';

import { StateProvider, initialState } from './StateProvider';


class App extends React.Component<any, any> {
    reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'setLoaded':
                return {
                    ...state,
                    loaded: state.transactions.length > 0 && state.balance != null && state.subscriptions.length > 0
                };
            case 'setTransactions':
                return {
                    ...state,
                    transactions: action.newTransactions
                };
            case 'setBalance':
                return {
                    ...state,
                    balance: action.balance
                };
            case 'setSubscriptions':
                return {
                    ...state,
                    subscriptions: action.subscriptions
                }
            case 'setSalaries':
                return {
                    ...state,
                    salaries: action.salaries
                }
            case 'addTransaction':
                let transactions = state["transactions"];
                transactions = [action.transaction].concat(transactions);
                return {
                    ...state,
                    transactions: transactions
                }
            case 'addSubscription':
                let subscriptions = state["subscriptions"];
                subscriptions.push(action.subscription);
                return {
                    ...state,
                    subscriptions: subscriptions
                }
            default:
                return state;
        }
    };

    render() {
        return (
            <StateProvider initialState={initialState} reducer={this.reducer}>
                <ServiceWrapper>
                    <Router>
                        <div className="App">
                            <Container>
                                <Row>
                                    <Header />
                                </Row>
                                <Row>
                                    <Col>
                                        <Route exact path="/" component={Overview} />
                                        <Route path="/analysis" component={Analysis} />
                                        <Route path="/salary" component={Salary} />
                                        <Route path="/budget" component={Budget} />
                                        <Route path="/subscriptions" component={Subscriptions} />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Router>
                </ServiceWrapper>
            </StateProvider>
        );
    }
}

export default App;
