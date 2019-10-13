import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from '../header/header';
import Overview from '../overview/overview';
import Salary from '../salary/salary';
import Subscriptions from '../subscriptions/subscriptions';
import Analysis from '../analysis/analysis';

import { AppState } from '../../store';
import { TransactionsHistory } from '../../store/types';
import { addTransaction } from '../../store/actions';

const mapStateToProps = (state: AppState) => ({
    transactions: state.transactions
});

interface AppProps {
    addTransaction?: typeof addTransaction
    transactions?: TransactionsHistory
};

class App extends React.Component<AppProps> {
    render() {
        return (
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
                                <Route path="/subscriptions" component={Subscriptions} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Router>
        );
    }

}

export default App;
