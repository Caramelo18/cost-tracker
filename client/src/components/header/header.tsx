import React from 'react';
import './header.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";


class Header extends React.Component<any, any> {
    render() {
        return (
            <nav >
                <Row>
                    <Col> <Link to="/" className="align-middle">Overview</Link> </Col>
                    <Col> <Link to="/analysis" className="align-middle">Analysis</Link> </Col>
                    <Col> <Link to="/salary" className="align-middle">Salary</Link> </Col>
                    <Col> <Link to="/budget" className="align-middle">Budget</Link> </Col>
                    <Col> <Link to="/subscriptions" className="align-middle">Subscriptions</Link> </Col>
                </Row>
            </nav>
        );
    }
}

export default Header;
