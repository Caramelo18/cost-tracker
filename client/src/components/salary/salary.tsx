import React from 'react';
import './salary.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Salary extends React.Component<any, any> {
    componentDidMount() {
        this.loadSalaries();
    }

    loadSalaries() {
        let url = "http://localhost:8080/salaries";
        fetch(url)
            .then(response => response.json())
            .then(response => console.log(response));
    }

    addSalary() {
        let url = "http://localhost:8080/salaries";
        let data = { grossValue: "3333", netValue: "2400", location: 'Barcelona', company: 'TomTom Telematics', role: 'Associate Software Engineer' };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            });
    }

    render() {
        return (
            <Row>
                <div>SALARY</div>
                <Button onClick={this.addSalary}>Add Salary</Button>
            </Row>
        );
    }
}

export default Salary;
