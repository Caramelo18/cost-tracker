import React from 'react';
import './header.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Link } from "react-router-dom";


class Header extends React.Component<any, any> {
    render() {
        return (
            <nav>
                <Row>
                    <Col sm={2}> <Link to="/">Overview</Link> </Col>
                    <Col sm={2}> <Link to="/salary">Salary</Link> </Col>
                </Row>
            </nav>
        );
    }
}

export default Header;
