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

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ApplicationState } from '../../store';

interface AppProps {
    store: Store<ApplicationState>;
};

const App: React.FC<AppProps> = ({ store }) => {

    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
