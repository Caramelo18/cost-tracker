import React from 'react';
import './analysis.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { withAppContext } from '../app/AppContext';

class Analysis extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return <div>Analysis tab</div>
    }
}

export default withAppContext(Analysis);
