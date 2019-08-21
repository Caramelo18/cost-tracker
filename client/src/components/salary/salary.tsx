import React from 'react';
import './salary.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Salary extends React.Component<any, any> {
    componentDidMount() {
        this.loadSalaries();
    }

    loadSalaries() {
        let url = "http://localhost:8080/salaries";
        fetch(url)
            .then(response => response.json())
            .then(response => this.parseSalaries(response));
    }

    parseSalaries(salaries: any[]) {
        let currentSalary = {};
        let salariesH: object[] = [];
        for (let salary of salaries) {
            if (salary.endDate == null) {
                currentSalary = salary;
            } else {
                salariesH.push(salary);
            }

        }
        this.setState({ currentSalary: currentSalary, salaries: salariesH });
    }

    fillTable() {
        let rows: object[] = [];
        this.state.salaries.forEach((salary: any) => {
            let startDate = new Date(salary.startDate).toDateString();
            let endDate = new Date(salary.endDate).toDateString();
            let salaryRow = <tr>
                <td>{salary.location}</td>
                <td>{salary.company}</td>
                <td>{salary.role}</td>
                <td>{salary.yearGrossValue}</td>
                <td>{salary.grossValue}</td>
                <td>{salary.netValue}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
            </tr>
            rows.push(salaryRow);
        });
        return rows;
    }

    addSalary() {
        let url = "http://localhost:8080/salaries";
        let data = { yearGrossValue: "40000", grossValue: "3333", netValue: "2400", location: 'Barcelona', company: 'TomTom Telematics', role: 'Associate Software Engineer' };
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
        if (!this.state) {
            return null;
        }
        let salariesTable = null;
        let startDate = this.state.currentSalary.startDate;
        startDate = new Date(startDate).toDateString();
        if (this.state.salaries != null) {
            let tableContent = this.fillTable()
            salariesTable =
                <Row className="table-row">
                    <div>Salary History: </div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Yearly Gross Salary</th>
                                <th>Gross Salary</th>
                                <th>Net Salary</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </Table>
                </Row>
        }

        return (
            <div>
                <Button></Button>
                <Row className="currSalaryHeader">
                    Current Salary
                </Row>
                <Row className="currSalaryValues">
                    <Col >
                        <Row className="attribute justify-content-end">{this.state.currentSalary.yearGrossValue}</Row>
                        <Row className="label justify-content-end">Yearly Gross Salary</Row>
                    </Col>
                    <Col>
                        <Row className="attribute justify-content-end">{this.state.currentSalary.grossValue}</Row>
                        <Row className="label justify-content-end">Gross Salary</Row>
                    </Col>
                    <Col>
                        <Row className="attribute justify-content-end">{this.state.currentSalary.netValue}</Row>
                        <Row className="label justify-content-end">Net Salary</Row>
                    </Col>
                </Row>

                <Row className="currSalaryDetails">
                    <Col>
                        <Row className="attribute justify-content-end">{startDate}</Row>
                        <Row className="label justify-content-end">Start Date</Row>
                    </Col>
                    <Col>
                        <Row className="attribute justify-content-end">{this.state.currentSalary.location}</Row>
                        <Row className="label justify-content-end">Location</Row>
                    </Col>
                    <Col>
                        <Row className="attribute justify-content-end">{this.state.currentSalary.company}</Row>
                        <Row className="label justify-content-end">Company</Row>
                    </Col>
                    <Col>
                        <Row className="attribute justify-content-end">{this.state.currentSalary.role}</Row>
                        <Row className="label justify-content-end">Role</Row>
                    </Col>
                </Row>

                {salariesTable}
            </div>
        );
    }
}

export default Salary;
