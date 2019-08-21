import React from 'react';
import './header.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as _, Link } from "react-router-dom";


class Header extends React.Component<any, any> {
    render() {
        return (
            <nav >
                <Row>
                    <Col sm={3}> <Link to="/" className="align-middle">Overview</Link> </Col>
                    <Col sm={3}> <Link to="/salary" className="align-middle">Salary</Link> </Col>
                    <Col sm={3}> <Link to="/budget" className="align-middle">Budget</Link> </Col>
                    <Col sm={3}> <Link to="/subscriptions" className="align-middle">Subscriptions</Link> </Col>
                </Row>
            </nav>
        );
    }
}

export default Header;
