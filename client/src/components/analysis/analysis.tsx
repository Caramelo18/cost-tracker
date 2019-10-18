import React from 'react';
import './analysis.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { StateContext } from '../app/StateProvider'

class Analysis extends React.Component<any, any> {
    static contextType = StateContext;

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const [{ transactions }, dispatch] = this.context;
        console.log(transactions);
    }

    render() {
        return (
            <div>Analysis tab</div>
        );
    }
}

export default Analysis;
