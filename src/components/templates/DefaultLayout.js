import React, { Fragment } from 'react';
import { Row, Container, Col } from 'reactstrap';

const DefaultLayout = ({ children }) => {
  return (
    <Fragment>
      <Container fluid>
        <Row noGutters={true}>
          <Col sm={12} className={'content'}>
            {children}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DefaultLayout;
