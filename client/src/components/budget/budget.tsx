import React from 'react';
import './budget.css';

import Container from  'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BudgetChart from './chart';

import { StateContext } from '../app/StateProvider';

class Budget extends React.Component<any, any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);

        this.editMonthsToAnalyze = this.editMonthsToAnalyze.bind(this);
    }

    componentDidMount() {
        this.setState({monthsToAnalyze: 6});
    }

    editMonthsToAnalyze(event: any) {
        let string: any = event.target.value;
        this.setState({ monthsToAnalyze: string });
    }

    render() {
        const [{ loaded, transactions }] = this.context;

        if (!loaded || this.state == null) {
            return "Loading";
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <h4>Budget Analysis</h4>
                    </Col>
                </Row>
                <Row className="monthsSelectorRow">
                    <span>
                        Months to Include:
                        <input value={this.state.monthsToAnalyze} onChange={this.editMonthsToAnalyze} />
                    </span>
                </Row>

                
                <BudgetChart transactions={transactions} monthsToAnalyze={this.state.monthsToAnalyze} />
        
            </Container>
        );
    }
}

export default Budget;
