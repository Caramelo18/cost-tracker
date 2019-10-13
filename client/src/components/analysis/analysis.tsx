import React from 'react';
import './analysis.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Analysis extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.loadSalaries();
    }

    loadSalaries() {
        let url = "http://localhost:8080/salaries";
        fetch(url)
            .then(response => response.json())
            .then(response => console.log(response));
    }

    render() {
        return <div>Analysis tab</div>
    }
}

export default Analysis;
