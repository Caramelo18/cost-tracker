import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Overview from '../overview/overview';

const App: React.FC = () => {
  return (
    <div className="App">
      <Container>
            <Row>
                <Col><Overview/></Col>
            </Row>
        </Container>
      
      
    </div>
  );
}

export default App;
