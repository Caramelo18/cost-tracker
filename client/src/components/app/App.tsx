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

const App: React.FC = () => {
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
                            <Route path="/salary" component={Salary} />
                            <Route path="/subscriptions" component={Subscriptions} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>

    );
}

export default App;
