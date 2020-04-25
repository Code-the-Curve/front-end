import React, { Fragment } from 'react';
import { Row, Container, Col } from 'reactstrap';

import NavBar from '../molecules/NavBar/index';
import SideBar from '../molecules/SideBar';

const DefaultLayout = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <Container fluid>
        <Row noGutters={true}>
          <Col sm={12} className={'content'}>
            <SideBar />
            {children}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DefaultLayout;
