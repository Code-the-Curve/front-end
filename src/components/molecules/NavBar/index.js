import React, { useState } from 'react';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default props = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      color="dark"
      dark
      className="navbar shadow-sm p-3 mb-5 rounded"
      expand="md"
    >
      <Button color="info" onClick={props.toggle}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              John Smith
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Notifications</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Sign Out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
